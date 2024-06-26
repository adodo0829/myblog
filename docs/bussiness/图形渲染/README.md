---
title: 图形渲染相关
date: "2022-01-14"
type: 技术
tags: GPU
note: 图形渲染相关
---

**CPU 对比 GPU**

CPU ==== GPU

- 延迟容忍度： 低， 高

- 并行目标： 任务（Task），数据（Data）

- 核心架构：多线程核心，SIMT 核心

- 线程数量级别：10，10000

- 吞吐量：低，高

- 缓存需求量：高，低

- 线程独立性：低，高

- 它们之间的差异（缓存、核心数量、内存、线程数等）可用下图展示出来：

## 渲染优化建议

**1.减少 CPU 和 GPU 的数据交换**

例如：glGetUniformLocation 会从 GPU 内存查询状态，耗费很多时间周期。

- 避免每帧设置、查询渲染状态，可在初始化时缓存状态。
- CPU 版的粒子、动画会每帧修改、提交数据，可移至 GPU 端。
- BVH
- Portal
- BSP
- OSP
- 合批（Batch）
- 减少顶点数、三角形数
- 视锥裁剪
- 避免每帧提交 Buffer 数据
- 减少渲染状态设置和查询
- 启用 GPU Instance
- 开启 LOD
- 避免从显存读数据

**2.减少过绘制**

- 粒子数量多且面积小，由于像素块机制，会加剧过绘制情况;植物、沙石、毛发等也如此
- 背面裁剪
- 遮挡裁剪
- 视口裁剪
- 剪切矩形（scissor rectangle）
- Early-Z
- 层次 Z 缓冲（Hierarchical Z-Buffering，HZB）
- 避免 Tex Kill 操作
- 避免 Alpha Test
- 避免 Alpha Blend
- 开启深度测试
- 开启裁剪：
- 控制物体数量

**3.Shader 优化**

- 避免 if、switch 分支语句
- 避免 for 循环语句，特别是循环次数可变的
- 减少纹理采样次数
- 禁用 clip 或 discard 操作
- 减少复杂数学函数调用

https://cloud.tencent.com/developer/article/2016951?from=article.detail.1814898
