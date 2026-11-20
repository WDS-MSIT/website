import pypdf

reader = pypdf.PdfReader("nba_all_depts.pdf")
print(f"Total pages: {len(reader.pages)}")

# Print text for each page if it mentions cse or it
for i, page in enumerate(reader.pages):
    text = page.extract_text()
    if not text:
        continue
    lower_text = text.lower()
    if any(k in lower_text for k in ["computer", "information", "cse", "it"]):
        print(f"\n================ PAGE {i+1} ================")
        print(text)
