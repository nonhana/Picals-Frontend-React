<div align="center">
   <img src="https://common-1319721118.cos.ap-shanghai.myqcloud.com/picgo/picals-logo.png" alt="picals-logo" width="480" />
</div>

### 项目简介

**Picals** 是一个受 [Pixiv](https://www.pixiv.net) 启发、纯粹由兴趣驱动、从零设计并编写的一个插画收藏平台。

它旨在为大家提供一个相较于 Pixiv 更方便、在国内浏览更快捷的找图、存图的方式，并且和论坛的功能相结合，营造和谐、舒适的国内插画讨论环境。

### 项目特色

1. **支持收藏夹功能。**

   灵感来源于 Bilibili 的收藏功能， 用户能够在浏览插画的时候对插画进行指定收藏夹的收藏。收藏夹可由用户自行创建，并且可以在个人中心对收藏的插画进行批量管理，同时也支持作品名搜索快速找到收藏的插画。

2. **维护多种插画浏览列表。**

   当用户从某一个插画列表（如推荐作品列表）点击进入到作品详情页后，会同时维护两种列表：

   1. 点击进入时的插画列表；
   2. 该插画发布者的插画列表。

   使用户能够通过插画列表快速浏览到下一个想要浏览的作品。并且用户能够同时在不同列表之间进行切换浏览，也可以一键跳出回到最开始进入的作品页。

3. **引入大图查看器。**

   本项目在作品详情页中引入了一款基于 React 实现的图片查看器：[react-photo-view](https://github.com/MinJieLiu/react-photo-view)，并在其基础之上进行了一些自定义封装，提供了如图片放大、缩小、旋转、**原图下载** 等实用功能。

4. **支持历史记录浏览。**

   灵感来源于 Bilibili 的历史记录。用户在浏览某个作品后，会将浏览信息记录至后台，用户可在个人中心的 **浏览记录** 页签中找到自己浏览过的作品。同时也支持历史记录的作品名搜索功能。

### 技术栈

这个项目主要的技术栈为 **React + Nest.js** ，使用 **TypeScript** 作为唯一开发语言。

### 相关文档

- [**项目概述**](https://nonhana.xyz/2024/03/12/picals-about/Picals%E9%A1%B9%E7%9B%AE%E6%A6%82%E8%BF%B0/)
- [**项目功能分析**](https://nonhana.xyz/2024/03/12/picals-about/Picals%E9%A1%B9%E7%9B%AE%E5%8A%9F%E8%83%BD%E5%88%86%E6%9E%90/)
- [**项目 UI 原型设计**](https://nonhana.xyz/2024/03/12/picals-about/Picals%E9%A1%B9%E7%9B%AEUI%E5%8E%9F%E5%9E%8B%E8%AE%BE%E8%AE%A1/)
- [**项目技术栈设计**](https://nonhana.xyz/2024/03/12/picals-about/Picals%E9%A1%B9%E7%9B%AE%E6%8A%80%E6%9C%AF%E6%A0%88%E8%AE%BE%E8%AE%A1/)
- [**项目数据库设计**](https://nonhana.xyz/2024/03/15/picals-about/Picals%E6%95%B0%E6%8D%AE%E5%BA%93%E8%AE%BE%E8%AE%A1%E6%96%87%E6%A1%A3/)
- [**项目接口文档**](https://picals.apifox.cn)
- [**项目部署方案**](https://nonhana.xyz/2024/06/03/picals-about/Picals%E9%A1%B9%E7%9B%AE%E9%83%A8%E7%BD%B2%E6%96%B9%E6%A1%88/)
- [**记录一些开发过程中踩的坑**](https://nonhana.xyz/2024/05/23/picals-about/%E8%AE%B0%E5%BD%95%E4%B8%80%E4%BA%9B%E5%BC%80%E5%8F%91%E8%BF%87%E7%A8%8B%E4%B8%AD%E8%B8%A9%E7%9A%84%E5%9D%91/)
- [**一些复杂功能的设计文档汇总**](https://nonhana.xyz/2024/07/07/picals-about/%E4%B8%80%E4%BA%9B%E5%A4%8D%E6%9D%82%E5%8A%9F%E8%83%BD%E7%9A%84%E8%AE%BE%E8%AE%A1%E6%96%87%E6%A1%A3%E6%B1%87%E6%80%BB/)

### 仓库

前端项目：[https://github.com/nonhana/Picals-Frontend-React](https://github.com/nonhana/Picals-Frontend-React)

后端项目：[https://github.com/nonhana/Picals-Backend-Nest](https://github.com/nonhana/Picals-Backend-Nest)
