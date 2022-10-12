import fs from "fs";
import path from "path";

const postsDirectory = path.join(process.cwd(), "content");

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.json$/, ""),
      },
    };
  });
}

export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.json`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const data = JSON.parse(fileContents);

  // Combine the data with the id
  return {
    id,
    data,
  };
}
