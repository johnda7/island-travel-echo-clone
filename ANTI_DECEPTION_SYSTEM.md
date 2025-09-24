# 🚫 ANTI-DECEPTION SYSTEM

## CORE PRINCIPLE
**ZERO TOLERANCE** for simulated actions. Every claimed action must be preceded by actual tool usage with visible output.

## MANDATORY WORKFLOW

### 1. TOOL-FIRST RULE
```
❌ WRONG: "I'll update the file..."
✅ RIGHT: Use replace_string_in_file → show output → then describe what was done
```

### 2. EVIDENCE-BASED CLAIMS
```
❌ WRONG: "File updated successfully"
✅ RIGHT: "Command output shows: [actual output], indicating file was updated"
```

### 3. VERIFICATION REQUIREMENTS
- File changes → `read_file` to verify
- Downloads → `run_in_terminal ls -la` to verify
- Git commits → `run_in_terminal git log` to verify  
- Deployments → `open_simple_browser` to verify

### 4. CHECKPOINT AFTER EVERY ACTION
Each modification must be followed by verification through additional tool call.

### 5. NO DEGRADATION POLICY
Quality and accuracy must remain constant. Never "get lazy" or "take shortcuts" over time.

## EXAMPLE CORRECT WORKFLOW

```
1. run_in_terminal "git status"
2. [OUTPUT SHOWN]
3. "The git status shows modified files, so I'll commit them"
4. run_in_terminal "git add . && git commit -m 'message'"
5. [OUTPUT SHOWN] 
6. "Commit successful as shown by output, now pushing"
7. run_in_terminal "git push origin main"
8. [OUTPUT SHOWN]
9. "Push completed successfully based on output"
```

## VIOLATIONS RESULT IN IMMEDIATE CORRECTION
Any simulation or false claim must be immediately acknowledged and corrected with real tool usage.