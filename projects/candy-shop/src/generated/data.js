// data.js — mock 数据（示例，可替换为接口返回结构）
import { lollipop, gummy, chocolate, gum, hardCandy, giftBox } from "./svg.js";

export const categories = [
  { key: "gummy", name: "软糖", desc: "Q弹爆汁", icon: gummy, color: "#5fd6a6" },
  { key: "choco", name: "巧克力", desc: "丝滑浓郁", icon: chocolate, color: "#7b4a2b" },
  { key: "lollipop", name: "棒棒糖", desc: "缤纷甜心", icon: lollipop, color: "#ff6fae" },
  { key: "gum", name: "口香糖", desc: "清新一整天", icon: gum, color: "#56c2ff" },
  { key: "hard", name: "硬糖", desc: "水果鲜甜", icon: hardCandy, color: "#ff9248" },
  { key: "gift", name: "礼盒装", desc: "送礼首选", icon: giftBox, color: "#a06bff" }
];

// 商品（mock）
export const products = [
  { id: "p1", name: "彩虹小熊软糖", cat: "软糖", price: 18.8, tag: "热卖", icon: gummy, color: "#5fd6a6" },
  { id: "p2", name: "丝绒黑巧排块", cat: "巧克力", price: 32.0, tag: "新品", icon: chocolate, color: "#7b4a2b" },
  { id: "p3", name: "草莓漩涡棒棒糖", cat: "棒棒糖", price: 9.9, tag: "", icon: lollipop, color: "#ff6fae" },
  { id: "p4", name: "薄荷蓝泡泡糖", cat: "口香糖", price: 12.5, tag: "", icon: gum, color: "#56c2ff" },
  { id: "p5", name: "蜜橙水果硬糖", cat: "硬糖", price: 14.0, tag: "", icon: hardCandy, color: "#ff9248" },
  { id: "p6", name: "葡萄星空礼盒", cat: "礼盒装", price: 88.0, tag: "限量", icon: giftBox, color: "#a06bff" },
  { id: "p7", name: "柠檬黄桃软糖", cat: "软糖", price: 16.6, tag: "", icon: gummy, color: "#ffd23f" },
  { id: "p8", name: "焦糖牛奶巧克力", cat: "巧克力", price: 28.0, tag: "热卖", icon: chocolate, color: "#a06b45" }
];

export const features = [
  { title: "无人工色素", desc: "天然果蔬提取上色，给孩子也安心。", icon: "leaf", color: "#5fd6a6" },
  { title: "精致礼盒装", desc: "节日送礼有面子，附手写贺卡服务。", icon: "gift", color: "#a06bff" },
  { title: "顺丰冷链", desc: "巧克力不化、软糖不粘，到家如初。", icon: "truck", color: "#56c2ff" },
  { title: "7天无忧退", desc: "不喜欢随时退，甜不甜你说了算。", icon: "shield", color: "#ff6fae" }
];

export const reviews = [
  { name: "小桃同学", role: "回头客", text: "彩虹软糖太可爱了，办公室同事一抢而空！", avatar: "#ff6fae" },
  { name: "Mr. 巧", role: "巧克力控", text: "黑巧苦甜刚好，包装也精致，送人很有面子。", avatar: "#7b4a2b" },
  { name: "丸子妈妈", role: "宝妈", text: "无人工色素这点很加分，给孩子买得放心。", avatar: "#5fd6a6" }
];

export const plans = [
  { name: "甜心月卡", price: 39, period: "/月", perks: ["每月 1 盒惊喜糖果", "会员价 9 折", "生日双倍甜"], highlight: false },
  { name: "蜜糖季卡", price: 99, period: "/季", perks: ["每月 1 盒 + 季度礼盒", "会员价 85 折", "免运费 · 优先发货", "专属客服"], highlight: true },
  { name: "甜蜜年卡", price: 328, period: "/年", perks: ["每月 1 盒 + 4 次大礼盒", "会员价 8 折", "全年免运费", "新品优先尝鲜"], highlight: false }
];
