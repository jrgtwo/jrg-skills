# Pre-migration

[Tickets](../index.md) · [Workflow](../workflow.md#holding-lists)

- **What:** every work item imported, unverified, from the docs this workflow replaced — shipped work, queues, ideas, known issues, parked items.
- **Add when:** only during migration. Nothing new is added here afterwards.
- **Remove when:** groomed — moved to history, a ticket, the backlog or deferred, or dropped. When this list is empty, delete the folder and its row in the tickets index.
- **Last groomed:** never.

Entry format:

```markdown
## <one line naming the item, in the old doc's words>

- From: `<old path>` lines <a–b> (now in `jrg/legacy/`)
- Old state: shipped | in progress | queued | idea | parked | known issue | dropped
- Imported: <date>

<The item as the old doc described it, condensed to two or three lines. Not checked against the code.>
```

## Entries

None yet.
