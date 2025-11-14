# Security Policy

## How API Keys Are Stored

This CLI tool stores API keys and configuration locally on your machine. Here's what you need to know:

### Storage Location

Configuration is stored at: `~/.claude-model-switcher/config.json`

### Security Measures

✅ **File Permissions (600)**: Config file is readable/writable only by you
- Directory: `700` (drwx------)
- Config file: `600` (-rw-------)
- Only your user account can access these files

✅ **API Key Masking**: By default, the `config` command masks API keys
- Shows: `sk-a****xyz` instead of full key
- Use `--show-keys` flag only when absolutely necessary

✅ **Local Storage Only**: No network requests, all data stays on your machine
- No telemetry
- No cloud sync
- No external API calls (keys stored for future use)

### Security Limitations

⚠️ **Plaintext Storage**: API keys are stored in plaintext JSON
- Protected by file permissions
- Readable if someone gains access to your user account
- Not encrypted at rest

⚠️ **Shared Systems**: Extra caution needed on multi-user systems
- Other admin/root users can read your files
- Consider using environment variables instead

⚠️ **Backup Safety**: If you backup ~/.claude-model-switcher/, secure those backups
- Config contains your API keys
- Ensure backups are encrypted

## Best Practices

### Recommended

1. **Use on personal machines only** - Single-user systems are safest
2. **Set file permissions** - Automatically set to 600, but verify after updates
3. **Use masked output** - Run `config` without `--show-keys` flag
4. **Rotate keys regularly** - Update API keys periodically
5. **Delete when not needed** - Remove config file when uninstalling: `rm -rf ~/.claude-model-switcher/`

### Avoid

1. ❌ Don't commit config file to git
2. ❌ Don't share screenshots of `config --show-keys` output
3. ❌ Don't store config in cloud-synced directories
4. ❌ Don't use on shared/public computers
5. ❌ Don't share your config.json file

## Security Commands

```bash
# View config with masked keys (safe)
model-switcher config

# View config with full keys (use with caution)
model-switcher config --show-keys

# Check file permissions
ls -la ~/.claude-model-switcher/

# Should show: drwx------ for directory, -rw------- for config.json
```

## Verifying File Permissions

After installation, verify permissions:

```bash
# Check directory permissions (should be 700)
stat -c "%a %n" ~/.claude-model-switcher/
# Output: 700 /home/user/.claude-model-switcher/

# Check config file permissions (should be 600)
stat -c "%a %n" ~/.claude-model-switcher/config.json
# Output: 600 /home/user/.claude-model-switcher/config.json
```

On macOS:
```bash
stat -f "%A %N" ~/.claude-model-switcher/
```

## Reporting Security Issues

If you discover a security vulnerability, please report it by:

1. **DO NOT** open a public GitHub issue
2. Email the repository owner privately (see package.json for contact)
3. Provide details about the vulnerability
4. Allow time for a fix before public disclosure

## Alternative: Environment Variables

For enhanced security, consider using environment variables instead of storing keys:

```bash
# Export keys in your shell profile (~/.bashrc, ~/.zshrc)
export CLAUDE_API_KEY="sk-ant-xxxxx"
export GLM_API_KEY="your-glm-key"

# Access them in your scripts instead of using set-key command
```

## Threat Model

### Protected Against

✅ Accidental exposure in screenshots (masked by default)
✅ World-readable files (600 permissions)
✅ Terminal history exposure (keys only passed as args, warn user)

### NOT Protected Against

❌ Root/admin users on the same system
❌ Malware running as your user
❌ Physical access to unlocked computer
❌ Compromised backups
❌ Memory dumps while CLI is running

## Security Updates

This tool follows security best practices for local CLI applications:

- File permissions are automatically enforced
- Keys are masked by default in output
- Users are warned about plaintext storage
- No external dependencies with known vulnerabilities

## License

This security policy is part of the claude-model-switcher project and is provided as-is under the MIT License.
