const fs = require("fs");
const path = require("path");
const join = path.join;
const resolve = path.resolve;

const articlesPath = "articles";
const bussinessPath = "bussiness";

//创建文件夹和文件的映射
function createSidebarMapObject(dirPath) {
  let fileMapObj = {};
  const temPath = resolve(__dirname, "..", dirPath);

  console.log("temPath", temPath);

  function getAllFiles(curPath) {
    const files = fs.readdirSync(curPath);
    files.forEach(function(file, index) {
      let fPath = join(curPath, file);
      let stat = fs.statSync(fPath);
      if (stat.isDirectory()) {
        fileMapObj[fPath] = [];
        getAllFiles(fPath);
      }
      if (stat.isFile()) {
        const fileObj = path.parse(fPath);
        const fileName = fileObj.name;
        if (Array.isArray(fileMapObj[curPath])) {
          // const link = getLink(fPath)
          fileName === "README"
            ? fileMapObj[curPath].unshift("")
            : fileMapObj[curPath].push(fileName);
        }
      }
    });
  }
  getAllFiles(temPath);
  return fileMapObj;
}

function getLink(link, pathName) {
  let tempLink = link.replace(/\\/g, "/");
  const index = tempLink.indexOf(pathName);
  tempLink = tempLink.slice(index - 1) + "/";
  return tempLink;
}

function createArticlesNavItem(fileMapObj, pathName) {
  let navItem = [];
  Object.keys(fileMapObj).forEach(function(title) {
    let tempTitle = title.replace(/\\/g, "/");
    const index = tempTitle.indexOf(pathName);
    const lastIndex = tempTitle.lastIndexOf("/");
    const link = tempTitle.slice(index - 1) + "/";
    const text = tempTitle.slice(lastIndex + 1);
    navItem.push({ text, link });
  });

  return navItem;
}
function createSideBar(fileMapObj, path) {
  const sidebar = {};
  Object.keys(fileMapObj).forEach(function(key) {
    const link = getLink(key, path);
    sidebar[link] = fileMapObj[key];
  });
  return sidebar;
}

// articles list
const artSidebarMapObject = createSidebarMapObject(articlesPath);

const artSidebar = createSideBar(artSidebarMapObject, articlesPath);
const articlesNavItem = createArticlesNavItem(
  artSidebarMapObject,
  articlesPath
);

// bus list
const busSidebarMapObject = createSidebarMapObject(bussinessPath);

const busSidebar = createSideBar(busSidebarMapObject, bussinessPath);
const busNavItem = createArticlesNavItem(busSidebarMapObject, bussinessPath);

const sidebar = {
  ...artSidebar,
  ...busSidebar,
};

console.log('sidebar',sidebar);

module.exports = {
  base: "/blogs/",
  title: "吾日三省吾身",
  description: "记录，学习，思考",
  markdown: {
    lineNumbers: true, // 代码块显示行号
  },
  port: 8888,
  hot: true,
  themeConfig: {
    // 你的GitHub仓库，请正确填写
    repo: "https://github.com/adodo0829",
    // 自定义仓库链接文字。
    repoLabel: "GitHub",
    nav: [
      { text: "首页", link: "/timeline/" },
      {
        text: "技术相关",
        items: articlesNavItem,
      },
      { text: "业务相关", items: busNavItem },
      { text: "标签", link: "/tags/" },
    ],
    sidebar,
    sidebarDepth: 2,
    // displayAllHeaders: true,
    lastUpdated: "Last Updated",
    smoothScroll: true,
  },
};
