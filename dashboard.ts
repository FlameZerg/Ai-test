import { serveDir } from "jsr:@std/http/file-server";

const PORT = 8000;

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  
  if (url.pathname === "/") {
    const projects: string[] = [];
    for await (const entry of Deno.readDir(".")) {
      if (entry.isDirectory) {
        projects.push(entry.name);
      }
    }
    projects.sort();

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project Dashboard</title>
  <style>
    :root {
      --bg-color: #f0f2f5;
      --card-bg: #ffffff;
      --text-color: #1a1a1a;
      --accent-color: #0070f3;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: var(--bg-color);
      color: var(--text-color);
      margin: 0;
      padding: 20px;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 {
      text-align: center;
      margin-bottom: 40px;
      font-weight: 800;
      color: #333;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .card {
      background: var(--card-bg);
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
      padding: 24px;
      transition: transform 0.2s, box-shadow 0.2s;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 150px;
    }
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 15px rgba(0,0,0,0.1);
    }
    .project-name {
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 10px;
      word-break: break-word;
    }
    .project-link {
      display: inline-block;
      text-decoration: none;
      color: white;
      background-color: var(--accent-color);
      padding: 10px 20px;
      border-radius: 6px;
      text-align: center;
      font-weight: 500;
      margin-top: auto;
    }
    .project-link:hover {
      background-color: #0051a2;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Project Dashboard</h1>
    <div class="grid">
      ${projects.map(name => `
        <div class="card">
          <div class="project-name">${name}</div>
          <a href="/${name}/" class="project-link">Open Project</a>
        </div>
      `).join("")}
    </div>
  </div>
</body>
</html>
    `;
    
    return new Response(html, {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }

  // Serve static files for any other path
  return serveDir(req, {
    fsRoot: ".",
    showDirListing: true,
  });
}

console.log(`Dashboard running on http://localhost:${PORT}`);
Deno.serve({ port: PORT }, handler);
