import { NextApiHandler } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET": {
      const data = readPostsInfo();
      res.json({ postsInfo: data });
    }
    default:
      return res.status(404).send("Not Found");
  }
};

export default handler;

const readPostsInfo = () => {
  const postsPath = path.join(process.cwd(), "posts");

  const files = fs.readdirSync(postsPath);

  const posts = files.map((file) => {
    const filePath = path.join(process.cwd(), "posts", file);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });
    return matter(fileContent).data;
  });

  return posts;
};

/* 
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
 
interface FormidablePromise<T> {
  files: { [key: string]: formidable.File };
  body: T;
}
 
export const readFile = async <T extends object>(
  req: NextApiRequest
): Promise<FormidablePromise<T>> => {
  const form = formidable();
  const [fields, files] = await form.parse(req);
 
  const result: any = {};
 
  if (!result.body) result.body = {};
  if (!result.files) result.files = {};
 
  for (let key in fields) {
    result.body[key] = fields[key][0];
  }
 
  for (let key in files) {
    const file = files[key][0];
    result.files[key] = file;
  }
 
  return result;
};
*/
