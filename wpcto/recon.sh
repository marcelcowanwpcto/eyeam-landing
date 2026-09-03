#!/usr/bin/env bash
# WPCTO fleet recon - READ ONLY capability probe.
#
# Run this on ONE site's SSH account per host (one Nimbus, one Hostinger) to
# discover what the jailed shell exposes. It writes nothing to the site: the
# only write is a single temp file in $TMPDIR to test writability, removed
# immediately. No WordPress state is modified.
#
# Usage:  bash recon.sh            # human readable report
#         bash recon.sh > out.txt  # capture and send back

set -u

ok()   { printf '  [ok]   %s\n' "$*"; }
no()   { printf '  [--]   %s\n' "$*"; }
info() { printf '  %-22s %s\n' "$1" "$2"; }
head_() { printf '\n== %s ==\n' "$*"; }

have() { command -v "$1" >/dev/null 2>&1; }

printf 'WPCTO recon  %s\n' "$(date -u '+%Y-%m-%dT%H:%M:%SZ')"

head_ "Account and shell"
info "user"        "$(id -un 2>/dev/null || echo '?')"
info "uid/gid"     "$(id -u 2>/dev/null)/$(id -g 2>/dev/null)"
info "hostname"    "$(hostname 2>/dev/null || echo '?')"
info "home"        "${HOME:-?}"
info "shell"       "${SHELL:-?}"
info "kernel"      "$(uname -sr 2>/dev/null || echo '?')"
if [ -r /etc/os-release ]; then
  info "os" "$(. /etc/os-release 2>/dev/null; echo "${PRETTY_NAME:-?}")"
fi
# A jailed shell usually cannot see init or other users' processes.
if [ -r /proc/1/cmdline ]; then ok "can read /proc/1 (weak jail)"; else no "/proc/1 unreadable (jailed - expected)"; fi

head_ "Tooling available"
for t in wp php mysql mysqldump tar gzip zip rsync curl wget git jq openssl awk sed find crontab ps top free df; do
  if have "$t"; then ok "$t  ($(command -v "$t"))"; else no "$t"; fi
done

head_ "PHP"
if have php; then
  info "version"     "$(php -r 'echo PHP_VERSION;' 2>/dev/null || echo '?')"
  info "memory_limit" "$(php -r 'echo ini_get("memory_limit");' 2>/dev/null || echo '?')"
  info "max_execution" "$(php -r 'echo ini_get("max_execution_time");' 2>/dev/null || echo '?')"
  info "binaries" "$(ls /usr/bin/php* /opt/*/bin/php* 2>/dev/null | tr '\n' ' ' || echo '?')"
else
  no "no php on PATH - WP-CLI will not run"
fi

head_ "WP-CLI and WordPress"
WPROOT=""
for d in "$HOME/public_html" "$HOME/htdocs" "$HOME/www" "$HOME/domains"/*/public_html "$HOME"; do
  [ -f "$d/wp-config.php" ] && { WPROOT="$d"; break; }
done
if [ -n "$WPROOT" ]; then
  ok "wp-config.php found: $WPROOT"
else
  no "wp-config.php not found in the usual places - set WPROOT manually"
fi

if have wp && [ -n "$WPROOT" ]; then
  info "wp-cli"   "$(wp --version 2>/dev/null | head -1 || echo 'present but errored')"
  info "wp core"  "$(wp core version --path="$WPROOT" --skip-plugins --skip-themes 2>/dev/null || echo '?')"
  info "db check" "$(wp db check --path="$WPROOT" --skip-plugins --skip-themes >/dev/null 2>&1 && echo 'db reachable' || echo 'db check failed')"
  info "plugins"  "$(wp plugin list --path="$WPROOT" --format=count --skip-plugins --skip-themes 2>/dev/null || echo '?')"
  info "admins"   "$(wp user list --role=administrator --path="$WPROOT" --format=count --skip-plugins --skip-themes 2>/dev/null || echo '?')"
  info "cron evts" "$(wp cron event list --path="$WPROOT" --format=count --skip-plugins --skip-themes 2>/dev/null || echo '?')"
  # Autoloaded option weight is a classic silent CPU/memory tax.
  AL=$(wp db query "SELECT ROUND(SUM(LENGTH(option_value))/1024) FROM \$(wp db prefix --path=$WPROOT 2>/dev/null)options WHERE autoload='yes';" \
        --path="$WPROOT" --skip-column-names --skip-plugins --skip-themes 2>/dev/null | tr -d '[:space:]')
  info "autoload KB" "${AL:-? (query blocked)}"
else
  no "wp-cli unusable here - everything downstream depends on this"
fi

head_ "Logs we can read"
FOUND=0
for p in "$HOME"/logs "$HOME"/log "$HOME"/*/logs "$HOME"/access-logs "$HOME"/tmp/logs /var/log/apache2 /var/log/nginx; do
  if [ -d "$p" ] 2>/dev/null; then
    ok "dir $p"
    ls -lh "$p" 2>/dev/null | head -8 | sed 's/^/         /'
    FOUND=1
  fi
done
for f in "$WPROOT/error_log" "$HOME/error_log" "$WPROOT/wp-content/debug.log"; do
  [ -f "$f" ] 2>/dev/null && { ok "file $f ($(du -h "$f" 2>/dev/null | cut -f1))"; FOUND=1; }
done
[ "$FOUND" -eq 0 ] && no "no readable logs found - CPU correlation gets much harder"

head_ "Resource visibility"
if have ps; then
  PROCS=$(ps -eo user= 2>/dev/null | sort -u | wc -l | tr -d ' ')
  info "distinct users in ps" "$PROCS"
  [ "${PROCS:-0}" -gt 3 ] && ok "can see other accounts' processes (server-wide view possible)" \
                          || no "only own processes visible (jailed - correlation approach needed)"
fi
# CloudLinux LVE would give real per-account CPU numbers from inside the jail.
if [ -e /proc/lve/list ] || have lveps || [ -d /var/lve ]; then
  ok "CloudLinux LVE detected - real per-account CPU stats may be available"
  have lveps && lveps 2>/dev/null | head -5 | sed 's/^/         /'
else
  no "no CloudLinux LVE detected"
fi
have free && free -m 2>/dev/null | sed 's/^/         /'
info "load avg" "$(cat /proc/loadavg 2>/dev/null || echo 'unreadable')"
info "cpu count" "$(nproc 2>/dev/null || echo '?')"

head_ "Disk and quota (backup headroom)"
df -h "$HOME" 2>/dev/null | sed 's/^/         /' || no "df blocked"
have quota && quota -s 2>/dev/null | sed 's/^/         /'
[ -n "$WPROOT" ] && info "site size" "$(du -sh "$WPROOT" 2>/dev/null | cut -f1 || echo '?')"
T="${TMPDIR:-/tmp}/.wpcto_probe_$$"
if touch "$T" 2>/dev/null; then ok "writable temp: ${TMPDIR:-/tmp}"; rm -f "$T"; else no "no writable temp - backups must stream over ssh"; fi

head_ "Scheduling and outbound network"
if have crontab; then
  crontab -l >/dev/null 2>&1 && ok "crontab readable ($(crontab -l 2>/dev/null | grep -cv '^#') entries)" || no "crontab not available"
fi
if have curl; then
  curl -s -o /dev/null -m 10 -w '         outbound https -> %{http_code} in %{time_total}s\n' https://api.wordpress.org/ 2>/dev/null \
    || no "outbound https blocked"
else
  no "no curl - cannot test outbound"
fi
have ssh && ok "ssh client present (can push backups out)" || no "no ssh client - backups must be pulled, not pushed"

printf '\n== done ==\nSend this whole output back. Nothing was modified.\n'
