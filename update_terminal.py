import re

with open('src/components/Terminal.tsx', 'r') as f:
    content = f.read()

# Replace projects.txt content
new_projects = """  "projects.txt": (
    <div className="space-y-2">
      <p>i have worked on several personal and academic projects. to see them all, please visit the projects page.</p>
      <p>type <span className="text-primary font-bold">cd projects</span> to view them or check out my github <span className="text-primary font-bold">cat links.txt</span>.</p>
    </div>
  ),"""
content = re.sub(r'  "projects.txt": \(\n.*?  \),', new_projects, content, flags=re.DOTALL)

# Replace skills.txt content with cv.txt
new_cv = """  "cv.txt": (
    <div className="space-y-2">
      <p>to see a snapshot of my professional background in software development, including my experience, education, and skills.</p>
      <p>type <span className="text-primary font-bold">cd cv</span> to view and download my curriculum vitae.</p>
    </div>
  ),"""
content = re.sub(r'  "skills.txt": \(\n.*?  \),', new_cv, content, flags=re.DOTALL)

# Update sequence
content = content.replace('["cat about.txt", "cat skills.txt", "cat projects.txt", "cat links.txt"]', '["cat about.txt", "cat cv.txt", "cat projects.txt", "cat links.txt"]')

with open('src/components/Terminal.tsx', 'w') as f:
    f.write(content)
