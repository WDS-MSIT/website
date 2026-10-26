---
name: principle-redesign-from-first-principles
description: "Apply when integrating a new requirement into an existing design."
---

# Redesign From First Principles

When integrating a change, don't bolt it onto the existing design. Redesign as if the requirement had been a foundational assumption from the start.

This is a reasoning method, not permission to rewrite unrelated code. Keep the proposed design within the user's scope, and ask before changing public behavior, ownership, or module boundaries.

- Read all affected files and understand the current design
- Ask: "if we were writing this from scratch with this new requirement, what would we build?"
- Propagate the change through every reference: types, docs, examples, rationale sections
- Think about the whole redesign, then deliver it incrementally

This is the method for preserving option value when integrating changes into an existing design.
