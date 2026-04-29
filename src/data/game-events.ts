// 游戏随机事件定义 - 基于100元初始金额的搞笑事件库
// 金额按百分比设计，基础100元可玩多天

export interface GameEventOption {
  text: string;
  // 金额基数：percent 为相对于初始金额100元的百分比，范围 -50% ~ +200%
  percentMin: number;
  percentMax: number;
  probability: number; // 选择概率 0-1
  description: string;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'work' | 'investment' | 'consumption' | 'opportunity' | 'risk';
  // 事件是否必定发生某种结果
  guaranteed: boolean;
  options: GameEventOption[];
}

// 基础金额基数（100元）
const BASE_AMOUNT = 100;

// 计算最终金额（防止破产但允许小额支出）
const calculateMoneyChange = (option: GameEventOption): number => {
  const percent = option.percentMin + Math.random() * (option.percentMax - option.percentMin);
  const amount = Math.round(BASE_AMOUNT * (percent / 100));
  // 确保收入至少有1元，支出至少有-1元（不让自己完全没钱）
  if (amount > 0) return Math.max(1, amount);
  if (amount < 0) return Math.min(-1, amount);
  return 0;
};

// ==================== 收入事件库 (40%) ====================

const workIncomeEvents: GameEvent[] = [
  // 工作收入：+5% ~ +30%
  { id: 'w1', title: '发传单', description: '街边有人问你要不要发传单赚点外快', icon: '📄', type: 'work', guaranteed: false, options: [{ text: '接受任务', percentMin: 5, percentMax: 15, probability: 0.8, description: '发了一下午传单，赚了点辛苦费' }, { text: '认真发传单', percentMin: 15, percentMax: 30, probability: 0.2, description: '老板看你表现好，多给了奖励' }, { text: '拒绝', percentMin: 0, percentMax: 0, probability: 0, description: '你假装没看见' }] },
  { id: 'w2', title: '送外卖', description: '外卖小哥的车坏了，看到你在路边发呆', icon: '🛵', type: 'work', guaranteed: false, options: [{ text: '帮忙送一单', percentMin: 3, percentMax: 10, probability: 0.7, description: '帮小哥送了一单，小哥给了辛苦费' }, { text: '多送几单', percentMin: 10, percentMax: 25, probability: 0.3, description: '你骑上电动车，一口气送了好几单' }] },
  { id: 'w3', title: '街头卖艺', description: '看到有人在地铁口弹吉他，你突然发现自己也会', icon: '🎸', type: 'work', guaranteed: false, options: [{ text: '加入卖艺', percentMin: 5, percentMax: 20, probability: 0.6, description: '路人被你感动纷纷投币' }, { text: '表演脱口秀', percentMin: 10, percentMax: 30, probability: 0.4, description: '虽然没人笑，但勇气可嘉' }] },
  { id: 'w4', title: '帮人排队', description: '奶茶店门口排起了长队，有人出高价雇你排队', icon: '🧋', type: 'work', guaranteed: false, options: [{ text: '接受任务', percentMin: 5, percentMax: 15, probability: 0.8, description: '帮土豪排了队，拿到报酬' }, { text: '升级服务', percentMin: 15, percentMax: 25, probability: 0.2, description: '排队还帮买，顾客给了小费' }] },
  { id: 'w5', title: '整理共享单车', description: '看到路边单车倒了一排，运维人员忙不过来', icon: '🚲', type: 'work', guaranteed: false, options: [{ text: '顺手扶一下', percentMin: 2, percentMax: 8, probability: 0.7, description: '扶了3辆车，路人给了奖励' }, { text: '全部整理好', percentMin: 8, percentMax: 20, probability: 0.3, description: '你把整条街的单车都摆整齐了' }] },
  { id: 'w6', title: '代人遛狗', description: '邻居要加班，问你能不能帮忙遛一下他的狗', icon: '🐕', type: 'work', guaranteed: false, options: [{ text: '欣然接受', percentMin: 5, percentMax: 15, probability: 0.7, description: '遛完狗，邻居给了辛苦费' }, { text: '陪狗玩耍', percentMin: 15, percentMax: 25, probability: 0.3, description: '狗很开心，邻居额外给了奖励' }] },
  { id: 'w7', title: '家教兼职', description: '楼下大妈问你能不能教她家孩子数学', icon: '📚', type: 'work', guaranteed: false, options: [{ text: '去当家教', percentMin: 10, percentMax: 25, probability: 0.7, description: '教了一晚上，收获教学费' }, { text: '认真辅导', percentMin: 25, percentMax: 40, probability: 0.3, description: '孩子进步很大，家长给了额外奖励' }] },
  { id: 'w8', title: '搬家帮工', description: '看到有人在喊搬家缺人手', icon: '📦', type: 'work', guaranteed: false, options: [{ text: '上去帮忙', percentMin: 10, percentMax: 20, probability: 0.7, description: '搬了一下午，赚了工钱' }, { text: '拼命干', percentMin: 20, percentMax: 35, probability: 0.3, description: '你拼尽全力，雇主给了双倍工钱' }] },
  { id: 'w9', title: '临时保安', description: '商场门口在招临时保安', icon: '🛡️', type: 'work', guaranteed: false, options: [{ text: '应聘保安', percentMin: 8, percentMax: 18, probability: 0.7, description: '站了一下午，赚了工钱' }, { text: '认真执勤', percentMin: 18, percentMax: 30, probability: 0.3, description: '你全程认真负责，额外获得奖励' }] },
  { id: 'w10', title: '问卷调查', description: '看到有人在做问卷调查，填一份给钱', icon: '📝', type: 'work', guaranteed: false, options: [{ text: '填问卷', percentMin: 3, percentMax: 10, probability: 0.8, description: '填了一份问卷，拿到报酬' }, { text: '多填几份', percentMin: 10, percentMax: 20, probability: 0.2, description: '你一口气填了好几份问卷' }] },
  { id: 'w11', title: '试吃员', description: '超市新开业，招募试吃员品尝美食', icon: '🍖', type: 'work', guaranteed: false, options: [{ text: '成为试吃员', percentMin: 5, percentMax: 12, probability: 0.8, description: '吃了一圈，还赚了报酬' }, { text: '认真品尝', percentMin: 12, percentMax: 25, probability: 0.2, description: '你的专业评价让经理很欣赏' }] },
  { id: 'w12', title: '代驾服务', description: '酒店门口有人需要代驾服务', icon: '🚗', type: 'work', guaranteed: false, options: [{ text: '接单代驾', percentMin: 10, percentMax: 25, probability: 0.7, description: '安全送到目的地，获得代驾费' }, { text: '五星服务', percentMin: 25, percentMax: 40, probability: 0.3, description: '服务周到，车主给了额外小费' }] },
  { id: 'w13', title: '跑腿服务', description: '有人在网上下单让你帮忙买东西', icon: '🏃', type: 'work', guaranteed: false, options: [{ text: '接单跑腿', percentMin: 5, percentMax: 12, probability: 0.8, description: '帮人买了东西，赚了跑腿费' }, { text: '极速送达', percentMin: 12, percentMax: 25, probability: 0.2, description: '你的速度让顾客非常满意' }] },
  { id: 'w14', title: '餐厅服务员', description: '附近餐厅高峰期缺人手', icon: '🍽️', type: 'work', guaranteed: false, options: [{ text: '去当服务员', percentMin: 10, percentMax: 20, probability: 0.7, description: '端了一晚上盘子，赚了工钱' }, { text: '周到服务', percentMin: 20, percentMax: 35, probability: 0.3, description: '你的服务让客人很满意，小费满满' }] },
  { id: 'w15', title: '电话客服', description: '公司临时需要电话客服', icon: '📞', type: 'work', guaranteed: false, options: [{ text: '接听电话', percentMin: 8, percentMax: 18, probability: 0.7, description: '接了一天电话，获得了工资' }, { text: '客户好评', percentMin: 18, percentMax: 30, probability: 0.3, description: '你成功解决了客户问题，获得奖励' }] },
  { id: 'w16', title: '超市理货员', description: '超市晚上需要理货员整理货架', icon: '🛒', type: 'work', guaranteed: false, options: [{ text: '去理货', percentMin: 5, percentMax: 12, probability: 0.7, description: '整理了货架，赚了工钱' }, { text: '分类大师', percentMin: 12, percentMax: 25, probability: 0.3, description: '你把货架整理得井井有条' }] },
];

// 助人为乐收入
const helpOthersEvents: GameEvent[] = [
  { id: 'h1', title: '扶老奶奶过马路', description: '路口站着一位看起来很着急的老奶奶', icon: '👵', type: 'opportunity', guaranteed: false, options: [{ text: '上前帮忙', percentMin: 2, percentMax: 8, probability: 0.8, description: '奶奶非要给你钱感谢你' }, { text: '送奶奶回家', percentMin: 8, percentMax: 15, probability: 0.2, description: '奶奶送了你一兜土特产' }] },
  { id: 'h2', title: '捡到钱包', description: '走路时发现地上有个钱包', icon: '👛', type: 'opportunity', guaranteed: false, options: [{ text: '交给警察', percentMin: 5, percentMax: 15, probability: 0.7, description: '失主很感动，给了你感谢费' }, { text: '原地等失主', percentMin: 10, percentMax: 25, probability: 0.3, description: '等了一会儿，失主土豪给了重谢' }] },
  { id: 'h3', title: '帮迷路小朋友找妈妈', description: '商场里有个小朋友在哭着找妈妈', icon: '👶', type: 'opportunity', guaranteed: false, options: [{ text: '帮助小朋友', percentMin: 3, percentMax: 10, probability: 0.8, description: '成功帮小朋友找到妈妈' }, { text: '广播寻人', percentMin: 8, percentMax: 18, probability: 0.2, description: '妈妈激动地非要给你报酬' }] },
  { id: 'h4', title: '给老人让座', description: '公交车上有个老人站在你面前', icon: '🚌', type: 'opportunity', guaranteed: false, options: [{ text: '主动让座', percentMin: 2, percentMax: 5, probability: 0.8, description: '老人非要给你钱感谢' }, { text: '让座+帮拿东西', percentMin: 5, percentMax: 12, probability: 0.2, description: '老人很感动，给了你零花钱' }] },
  { id: 'h5', title: '帮忙推车', description: '前面的大叔车胎没气了在推车', icon: '🚗', type: 'opportunity', guaranteed: false, options: [{ text: '帮忙推车', percentMin: 3, percentMax: 8, probability: 0.8, description: '你帮他把车推到修理店' }, { text: '陪他修好', percentMin: 8, percentMax: 18, probability: 0.2, description: '大叔非要请你吃饭还给了钱' }] },
  { id: 'h6', title: '指路服务', description: '有个游客拿着地图一脸迷茫', icon: '🗺️', type: 'opportunity', guaranteed: false, options: [{ text: '热情指路', percentMin: 2, percentMax: 8, probability: 0.8, description: '你详细讲解了路线' }, { text: '带路服务', percentMin: 8, percentMax: 15, probability: 0.2, description: '你直接带他走到目的地' }] },
  { id: 'h7', title: '帮人拍照', description: '情侣在景点自拍总拍不好', icon: '📷', type: 'opportunity', guaranteed: false, options: [{ text: '帮忙拍照', percentMin: 2, percentMax: 5, probability: 0.8, description: '你拍的照片让他们很满意' }, { text: '专业摄影', percentMin: 5, percentMax: 12, probability: 0.2, description: '你用毕生所学给他们拍了组大片' }] },
  { id: 'h8', title: '借充电宝', description: '有人手机没电了急得团团转', icon: '🔋', type: 'opportunity', guaranteed: false, options: [{ text: '借充电宝', percentMin: 1, percentMax: 3, probability: 0.9, description: '他还你时硬要给你一点钱' }, { text: '陪他等充电', percentMin: 3, percentMax: 8, probability: 0.1, description: '他非要请你喝杯奶茶表示感谢' }] },
  { id: 'h9', title: '帮人撑伞', description: '突降大雨，有人没带伞在淋雨', icon: '☔', type: 'opportunity', guaranteed: false, options: [{ text: '共撑一把伞', percentMin: 2, percentMax: 5, probability: 0.8, description: '你们一起走到地铁站' }, { text: '伞送你了', percentMin: 5, percentMax: 12, probability: 0.2, description: '他说你人太好了，非要买杯饮料给你' }] },
  { id: 'h10', title: '扫码送礼物', description: '有人说扫码注册送小礼物', icon: '🎁', type: 'opportunity', guaranteed: false, options: [{ text: '扫码注册', percentMin: 5, percentMax: 15, probability: 0.6, description: '注册完拿到了小礼物' }, { text: '多注册几个', percentMin: 10, percentMax: 25, probability: 0.4, description: '你一下午注册了5个APP' }] },
];

// 日常小惊喜收入
const dailySurpriseEvents: GameEvent[] = [
  { id: 's1', title: '瓶盖中奖', description: '喝饮料时发现瓶盖写着"再来一瓶"', icon: '🥤', type: 'opportunity', guaranteed: false, options: [{ text: '兑换奖励', percentMin: 3, percentMax: 8, probability: 0.9, description: '又喝了一瓶，还顺带把瓶子钱赚回来了' }, { text: '多换几瓶', percentMin: 8, percentMax: 15, probability: 0.1, description: '老板库存很多，连续兑了好几个' }] },
  { id: 's2', title: '微信红包', description: '群里有人发了红包', icon: '🧧', type: 'opportunity', guaranteed: false, options: [{ text: '抢红包', percentMin: 1, percentMax: 5, probability: 0.8, description: '手气还行，抢到了一点钱' }, { text: '运气王', percentMin: 5, percentMax: 15, probability: 0.2, description: '你是运气王！抢到了不少' }] },
  { id: 's3', title: '商家返现', description: '吃完饭商家说扫码返现', icon: '💁', type: 'opportunity', guaranteed: false, options: [{ text: '扫码返现', percentMin: 3, percentMax: 8, probability: 0.8, description: '获得返现，相当于白吃了一顿饭' }, { text: '好评返现', percentMin: 8, percentMax: 15, probability: 0.2, description: '你写了200字好评，商家给了返现' }] },
  { id: 's4', title: '积分兑换', description: '手机收到短信说积分快过期了', icon: '🎁', type: 'opportunity', guaranteed: false, options: [{ text: '兑换礼品', percentMin: 5, percentMax: 15, probability: 0.7, description: '用积分换了代金券' }, { text: '换通话时长', percentMin: 3, percentMax: 8, probability: 0.3, description: '换了通话时长，又能打很多电话了' }] },
  { id: 's5', title: '商场抽奖', description: '购物后被邀请参加抽奖', icon: '🎰', type: 'opportunity', guaranteed: false, options: [{ text: '试试手气', percentMin: 5, percentMax: 20, probability: 0.6, description: '抽中了代金券，今天运气不错' }, { text: '再抽一次', percentMin: 15, percentMax: 40, probability: 0.4, description: '连中两次！工作人员都看呆了' }] },
  { id: 's6', title: '手机充值', description: '手机欠费了，客服说有人帮你充值', icon: '📱', type: 'opportunity', guaranteed: false, options: [{ text: '感谢好心人', percentMin: 10, percentMax: 30, probability: 0.5, description: '神秘人给你充了值，话费暴富' }, { text: '原来是妈妈', percentMin: 15, percentMax: 40, probability: 0.5, description: '妈妈偷偷给你充了值，还多给了零花钱' }] },
  { id: 's7', title: '捡到购物卡', description: '在地上捡到一张购物卡', icon: '🛍️', type: 'opportunity', guaranteed: false, options: [{ text: '交给服务台', percentMin: 5, percentMax: 15, probability: 0.6, description: '失主找到后非要给你感谢费' }, { text: '原地等失主', percentMin: 10, percentMax: 25, probability: 0.4, description: '等了半小时，失主请你喝奶茶还给了钱' }] },
  { id: 's8', title: '买到打折商品', description: '发现超市大促销，折扣超低', icon: '🛒', type: 'consumption', guaranteed: false, options: [{ text: '买买买', percentMin: 5, percentMax: 20, probability: 0.7, description: '你精打细算，省了不少钱' }, { text: '大量囤货', percentMin: 10, percentMax: 30, probability: 0.3, description: '你把货架都快清空了' }] },
];

// ==================== 支出事件库 (40%) ====================

const dailyConsumptionEvents: GameEvent[] = [
  // 日常消费：-3% ~ -15%
  { id: 'c1', title: '吃早餐', description: '肚子咕咕叫，路边早餐摊飘来香味', icon: '🥣', type: 'consumption', guaranteed: false, options: [{ text: '吃碗面条', percentMin: -10, percentMax: -5, probability: 0.6, description: '热乎乎的面条真香' }, { text: '买包子油条', percentMin: -5, percentMax: -2, probability: 0.4, description: '两个包子+一根油条，管饱' }] },
  { id: 'c2', title: '买奶茶', description: '奶茶店在打折，第二杯半价', icon: '🧋', type: 'consumption', guaranteed: false, options: [{ text: '买两杯', percentMin: -15, percentMax: -8, probability: 0.5, description: '和朋友一人一杯，虽然花了点钱但很开心' }, { text: '买一杯', percentMin: -8, percentMax: -4, probability: 0.5, description: '只买一杯解解馋' }] },
  { id: 'c3', title: '超市购物', description: '本来只想买点东西，结果逛了一小时', icon: '🛒', type: 'consumption', guaranteed: false, options: [{ text: '买必需品', percentMin: -15, percentMax: -8, probability: 0.5, description: '买了些日用品' }, { text: '促销活动真香', percentMin: -25, percentMax: -12, probability: 0.5, description: '买一送一、第二件半价...不自觉就买多了' }] },
  { id: 'c4', title: '充话费', description: '手机收到短信说余额不足', icon: '📱', type: 'consumption', guaranteed: true, options: [{ text: '充话费', percentMin: -20, percentMax: -10, probability: 1, description: '话费余额恢复正常' }] },
  { id: 'c5', title: '买零食', description: '路过零食店，橱窗里的零食在向你招手', icon: '🍫', type: 'consumption', guaranteed: false, options: [{ text: '买零食大礼包', percentMin: -15, percentMax: -8, probability: 0.5, description: '薯片、果冻、巧克力...装了满满一袋' }, { text: '只买一点点', percentMin: -8, percentMax: -3, probability: 0.5, description: '就拿了几包解解馋' }] },
  { id: 'c6', title: '买咖啡', description: '困意袭来，想买杯咖啡提神', icon: '☕', type: 'consumption', guaranteed: false, options: [{ text: '星巴克', percentMin: -15, percentMax: -8, probability: 0.3, description: '拿铁加浓缩，今天全靠它了' }, { text: '瑞幸也行', percentMin: -8, percentMax: -4, probability: 0.7, description: '便宜一半，味道也还行' }] },
  { id: 'c7', title: '买游戏皮肤', description: '游戏里出了限定皮肤', icon: '🎮', type: 'consumption', guaranteed: false, options: [{ text: '买限定皮肤', percentMin: -30, percentMax: -15, probability: 0.4, description: '虽然花了钱，但这个皮肤也太帅了' }, { text: '忍住了', percentMin: -5, percentMax: -2, probability: 0.6, description: '看了看余额，还是算了' }] },
  { id: 'c8', title: '打车回家', description: '下班太累了，不想挤地铁', icon: '🚗', type: 'consumption', guaranteed: false, options: [{ text: '快车回家', percentMin: -12, percentMax: -5, probability: 0.7, description: '虽然有点堵，但坐着比站着舒服' }, { text: '专车回家', percentMin: -20, percentMax: -10, probability: 0.3, description: '今天太累了，对自己好一点' }] },
  { id: 'c9', title: '买纸巾', description: '纸巾快用完了', icon: '🧻', type: 'consumption', guaranteed: true, options: [{ text: '买一提', percentMin: -8, percentMax: -3, probability: 1, description: '一提10包，应该够用一阵子了' }] },
  { id: 'c10', title: '停车费', description: '逛完商场发现停车超时要交费', icon: '🅿️', type: 'consumption', guaranteed: false, options: [{ text: '正常缴费', percentMin: -10, percentMax: -5, probability: 0.7, description: '停了一会儿，缴了停车费' }, { text: '停了一整天', percentMin: -20, percentMax: -10, probability: 0.3, description: '逛得太开心，停车费肉疼' }] },
];

// 被坑消费
const beingScammedEvents: GameEvent[] = [
  { id: 'sc1', title: '景区纪念品', description: '旅游景点的东西看起来很有特色', icon: '🎭', type: 'consumption', guaranteed: false, options: [{ text: '买一个', percentMin: -15, percentMax: -5, probability: 0.6, description: '买了个"正宗"当地特产' }, { text: '批发一堆', percentMin: -30, percentMax: -15, probability: 0.4, description: '给朋友都带了礼物' }] },
  { id: 'sc2', title: '网红小吃', description: '排了2小时队终于买到了网红小吃', icon: '🍡', type: 'consumption', guaranteed: false, options: [{ text: '买一份尝尝', percentMin: -12, percentMax: -5, probability: 0.7, description: '就这？排了2小时...不过味道还行' }, { text: '多买几份', percentMin: -25, percentMax: -12, probability: 0.3, description: '给朋友都带了，结果朋友说不好吃' }] },
  { id: 'sc3', title: '路边切糕', description: '看到切糕很想尝尝', icon: '🍘', type: 'risk', guaranteed: false, options: [{ text: '切一小块', percentMin: -15, percentMax: -8, probability: 0.6, description: '切糕师傅手起刀落，15块' }, { text: '买了一块', percentMin: -30, percentMax: -15, probability: 0.4, description: '师傅说是按克算的，天价切糕' }] },
  { id: 'sc4', title: '手机分期购', description: '营业员说手机可以零利息分期', icon: '📱', type: 'risk', guaranteed: false, options: [{ text: '分期买iPhone', percentMin: -40, percentMax: -20, probability: 0.5, description: '24期免息，每月只需一点点' }, { text: '太贵了不买', percentMin: -3, percentMax: -1, probability: 0.5, description: '你摸了摸自己的钱包，选择继续用旧手机' }] },
  { id: 'sc5', title: '健身房促销', description: '健身房销售说今天办卡最便宜', icon: '💪', type: 'risk', guaranteed: false, options: [{ text: '办年卡', percentMin: -50, percentMax: -25, probability: 0.4, description: '热血上头办了年卡' }, { text: '办个月卡', percentMin: -15, percentMax: -8, probability: 0.3, description: '先试试，不行就撤' }, { text: '在家锻炼', percentMin: -2, percentMax: 0, probability: 0.3, description: '你说健身房都是骗人的' }] },
  { id: 'sc6', title: '办卡充值', description: '理发店说充500送300', icon: '💈', type: 'risk', guaranteed: false, options: [{ text: '充一点试试', percentMin: -15, percentMax: -8, probability: 0.5, description: '先充一点试试水' }, { text: '充值大额', percentMin: -40, percentMax: -20, probability: 0.5, description: '充了会员卡希望能多用几次' }] },
  { id: 'sc7', title: '扫码送礼物', description: '有人说扫码注册送小礼物', icon: '🎁', type: 'risk', guaranteed: false, options: [{ text: '扫一个', percentMin: -20, percentMax: -10, probability: 0.4, description: '注册完发现是网贷APP' }, { text: '没理会', percentMin: 0, percentMax: 0, probability: 0.6, description: '你很警惕，完美避开了一个陷阱' }] },
  { id: 'sc8', title: '抽奖骗局', description: '超市门口说购物满额可以抽奖', icon: '🎰', type: 'risk', guaranteed: false, options: [{ text: '抽奖试试', percentMin: -30, percentMax: -15, probability: 0.5, description: '抽中了一等奖，玉石打1折' }, { text: '不贪小便宜', percentMin: 0, percentMax: 0, probability: 0.5, description: '你深知天上不会掉馅饼' }] },
];

// ==================== 特殊收入事件库 (10%) ====================
// 触发概率低，但金额高

const specialIncomeEvents: GameEvent[] = [
  { id: 'sp1', title: '彩票中奖', description: '你随手买的彩票居然中奖了！', icon: '🎰', type: 'opportunity', guaranteed: false, options: [{ text: '中了小奖', percentMin: 50, percentMax: 200, probability: 0.8, description: '运气不错！中了奖金！' }, { text: '中了大奖', percentMin: 200, percentMax: 500, probability: 0.2, description: '天哪！你中了大奖！' }] },
  { id: 'sp2', title: '股票涨停', description: '你买的一支股票连续涨了好几天', icon: '📈', type: 'investment', guaranteed: false, options: [{ text: '全部卖出', percentMin: 30, percentMax: 100, probability: 0.7, description: '翻了！落袋为安！' }, { text: '继续持有', percentMin: 50, percentMax: 150, probability: 0.3, description: '你相信还会涨，果然又涨了' }] },
  { id: 'sp3', title: '比特币暴富', description: '你突然想起几年前买过几个比特币', icon: '₿', type: 'investment', guaranteed: false, options: [{ text: '全部抛售', percentMin: 100, percentMax: 300, probability: 0.6, description: '当年买的价格，现在翻了好多倍！' }, { text: '再等等', percentMin: 150, percentMax: 400, probability: 0.4, description: '你决定赌一把，果然又涨了' }] },
  { id: 'sp4', title: '网红突然爆火', description: '你随手拍的视频突然上了热搜', icon: '📹', type: 'opportunity', guaranteed: false, options: [{ text: '趁热直播带货', percentMin: 50, percentMax: 200, probability: 0.7, description: '一场直播卖了不少' }, { text: '接广告', percentMin: 80, percentMax: 300, probability: 0.3, description: '各大品牌纷纷找上门' }] },
  { id: 'sp5', title: '拆迁户诞生', description: '你家那片要拆迁了！', icon: '🏠', type: 'opportunity', guaranteed: false, options: [{ text: '签字拿钱', percentMin: 200, percentMax: 500, probability: 0.7, description: '恭喜你成为有钱人！' }, { text: '要房不要钱', percentMin: 300, percentMax: 800, probability: 0.3, description: '拿了安置房，从此当上包租公' }] },
  { id: 'sp6', title: '继承遗产', description: '多年不联系亲戚留给你一笔遗产', icon: '📜', type: 'opportunity', guaranteed: false, options: [{ text: '接受遗产', percentMin: 100, percentMax: 300, probability: 0.8, description: '律师说是合法的，遗产到账！' }, { text: '核实后接受', percentMin: 150, percentMax: 400, probability: 0.2, description: '你谨慎核实后，确实有这笔遗产' }] },
  { id: 'sp7', title: '抖音直播打赏', description: '你心血来潮开了场直播', icon: '🎙️', type: 'opportunity', guaranteed: false, options: [{ text: '认真直播', percentMin: 30, percentMax: 100, probability: 0.7, description: '土豪刷了礼物' }, { text: 'PK赢了', percentMin: 50, percentMax: 150, probability: 0.3, description: '直播PK赢了对面，分到不少打赏' }] },
  { id: 'sp8', title: '公司上市期权', description: '你入职时拿的期权终于兑现了', icon: '🏢', type: 'investment', guaranteed: false, options: [{ text: '全部兑现', percentMin: 200, percentMax: 500, probability: 0.6, description: '公司上市了，你的期权翻了好多倍！' }, { text: '留一半', percentMin: 300, percentMax: 800, probability: 0.4, description: '你留了一半股票，之后又涨了' }] },
  { id: 'sp9', title: '投稿被采用', description: '你学生时代写的小说突然爆火', icon: '✍️', type: 'opportunity', guaranteed: false, options: [{ text: '签出版合同', percentMin: 100, percentMax: 300, probability: 0.7, description: '出版社出价，你成了畅销书作家' }, { text: '影视改编', percentMin: 200, percentMax: 500, probability: 0.3, description: '有影视公司想买改编权' }] },
  { id: 'sp10', title: '游戏搬砖变现', description: '你发现玩的游戏居然能卖钱', icon: '🎮', type: 'opportunity', guaranteed: false, options: [{ text: '卖掉装备', percentMin: 30, percentMax: 100, probability: 0.7, description: '你把打了很久的装备卖了' }, { text: '职业商人', percentMin: 80, percentMax: 200, probability: 0.3, description: '你开始职业搬砖，赚了不少' }] },
];

// ==================== 特殊支出事件库 (10%) ====================
// 触发概率低，但金额高

const specialExpenseEvents: GameEvent[] = [
  { id: 'se1', title: '投资P2P暴雷', description: '朋友推荐了一个超高收益的P2P', icon: '💸', type: 'risk', guaranteed: false, options: [{ text: '投资试试', percentMin: -40, percentMax: -20, probability: 0.6, description: '平台跑路了，钱打了水漂' }, { text: '觉得不对劲', percentMin: 0, percentMax: 0, probability: 0.4, description: '你研究了一下，觉得是庞氏骗局' }] },
  { id: 'se2', title: '创业失败', description: '你决定自己当老板', icon: '📋', type: 'risk', guaranteed: false, options: [{ text: '开个小店', percentMin: -50, percentMax: -25, probability: 0.6, description: '开了个店，几个月倒闭了' }, { text: '互联网创业', percentMin: -80, percentMax: -40, probability: 0.4, description: '做了个APP，用户没几个' }] },
  { id: 'se3', title: '炒股被套', description: '牛市来了，你冲进了股市', icon: '📉', type: 'risk', guaranteed: false, options: [{ text: '小试牛刀', percentMin: -30, percentMax: -10, probability: 0.6, description: '你买了点股票，结果被套了' }, { text: '相信专家', percentMin: -50, percentMax: -25, probability: 0.4, description: '专家说会涨，你信了，结果...' }] },
  { id: 'se4', title: '赌博输光', description: '朋友带你去赌场见世面', icon: '🎰', type: 'risk', guaranteed: false, options: [{ text: '小赌怡情', percentMin: -20, percentMax: -8, probability: 0.6, description: '玩了两把，输了一点钱' }, { text: '想翻本', percentMin: -50, percentMax: -25, probability: 0.4, description: '你越输越想翻本，最后...' }] },
  { id: 'se5', title: '买期房烂尾', description: '你买了套房，结果成了烂尾楼', icon: '🏗️', type: 'risk', guaranteed: false, options: [{ text: '继续还贷', percentMin: -30, percentMax: -15, probability: 0.6, description: '一边租房一边还贷，白白支出了不少' }, { text: '提前查了资质', percentMin: 0, percentMax: 0, probability: 0.4, description: '你发现是问题楼盘，选择不买' }] },
  { id: 'se6', title: '加盟奶茶店', description: '看到某品牌奶茶店很火，决定加盟', icon: '🧋', type: 'risk', guaranteed: false, options: [{ text: '正规加盟', percentMin: -60, percentMax: -30, probability: 0.6, description: '加盟费+装修+原料，亏了不少' }, { text: '先去考察', percentMin: -5, percentMax: -2, probability: 0.4, description: '你花钱去考察，发现是坑，及时止损' }] },
  { id: 'se7', title: '借给朋友钱', description: '多年好友开口借钱', icon: '🤝', type: 'risk', guaranteed: false, options: [{ text: '借一点', percentMin: -20, percentMax: -8, probability: 0.5, description: '说好一个月还，结果...' }, { text: '哭穷拒绝', percentMin: 0, percentMax: 0, probability: 0.5, description: '你说自己都吃不饱，朋友悻悻走了' }] },
  { id: 'se8', title: '直播打赏冲动', description: '你看直播时头脑一热', icon: '🎁', type: 'risk', guaranteed: false, options: [{ text: '刷了个礼物', percentMin: -25, percentMax: -10, probability: 0.6, description: '手滑了！刷了不少礼物' }, { text: '理性看直播', percentMin: 0, percentMax: 0, probability: 0.4, description: '你只看不上头，省了很多钱' }] },
  { id: 'se9', title: '酒驾被抓', description: '喝完酒觉得自己很清醒', icon: '🚗', type: 'risk', guaranteed: false, options: [{ text: '配合处理', percentMin: -15, percentMax: -5, probability: 0.7, description: '扣分罚款，还被教育了一顿' }, { text: '叫了代驾', percentMin: -3, percentMax: -1, probability: 0.3, description: '花点钱叫代驾，安全到家' }] },
  { id: 'se10', title: '酒局应酬', description: '甲方爸爸来了，必须喝好', icon: '🍺', type: 'risk', guaranteed: false, options: [{ text: '陪甲方喝', percentMin: -20, percentMax: -8, probability: 0.7, description: '一顿饭喝了不少，酒钱花了不少' }, { text: '以茶代酒', percentMin: -5, percentMax: -2, probability: 0.3, description: '甲方觉得你诚意不够' }] },
];

// ==================== 事件生成与获取 ====================

// 合并所有事件
const allEvents: GameEvent[] = [
  ...workIncomeEvents,
  ...helpOthersEvents,
  ...dailySurpriseEvents,
  ...dailyConsumptionEvents,
  ...beingScammedEvents,
  ...specialIncomeEvents,
  ...specialExpenseEvents,
];

// 生成变体以达到大量事件
const generateEventVariants = (baseEvents: GameEvent[], times: number): GameEvent[] => {
  const variants: GameEvent[] = [];
  const locations = [
    '三里屯', '国贸', '陆家嘴', '中关村', '望京', '南锣鼓巷', '田子坊', '城隍庙',
    '西湖', '解放碑', '洪崖洞', '宽窄巷子', '春熙路', '观音桥', '王府井', '南京路',
    '外滩', '小寨', '大唐不夜城', '回民街', '五道口', '朝阳大悦城', '珠江新城',
    '天河城', '太古汇', '静安寺', '徐家汇', '新天地', '前门大街', '西单', '武侯祠'
  ];
  
  for (let i = 0; i < times; i++) {
    const baseEvent = baseEvents[i % baseEvents.length];
    const location = locations[i % locations.length];
    
    variants.push({
      ...baseEvent,
      id: `${baseEvent.id}_v${i}`,
      title: `${location}${baseEvent.title}`,
      description: baseEvent.description.replace('这', `在${location}这`),
    });
  }
  
  return variants;
};

// 生成大量事件
export const gameEvents: GameEvent[] = [
  ...allEvents,
  ...generateEventVariants(workIncomeEvents, 200),
  ...generateEventVariants(helpOthersEvents, 150),
  ...generateEventVariants(dailySurpriseEvents, 100),
  ...generateEventVariants(dailyConsumptionEvents, 200),
  ...generateEventVariants(beingScammedEvents, 100),
  ...generateEventVariants(specialIncomeEvents, 50),
  ...generateEventVariants(specialExpenseEvents, 50),
];

// 根据权重获取随机事件
export const getWeightedRandomEvent = (): GameEvent => {
  const roll = Math.random();
  
  if (roll < 0.4) {
    // 40% 普通收入事件
    const incomeEvents = gameEvents.filter(e => e.type === 'work' || e.type === 'opportunity');
    return incomeEvents[Math.floor(Math.random() * incomeEvents.length)];
  } else if (roll < 0.8) {
    // 40% 普通支出事件
    const expenseEvents = gameEvents.filter(e => e.type === 'consumption' || e.type === 'risk');
    return expenseEvents[Math.floor(Math.random() * expenseEvents.length)];
  } else if (roll < 0.9) {
    // 10% 特殊收入事件
    const specialIncome = gameEvents.filter(e => e.options.some(o => o.percentMax > 30));
    return specialIncome[Math.floor(Math.random() * specialIncome.length)] || specialIncomeEvents[0];
  } else {
    // 10% 特殊支出事件
    const specialExpense = gameEvents.filter(e => e.options.some(o => o.percentMin < -30));
    return specialExpense[Math.floor(Math.random() * specialExpense.length)] || specialExpenseEvents[0];
  }
};

// 随机选择事件的选项（系统自动选择）
export const getRandomOption = (event: GameEvent): { option: GameEventOption; moneyChange: number } => {
  // 根据概率计算权重
  const weights = event.options.map(o => o.probability);
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  
  let random = Math.random() * totalWeight;
  let selectedOption = event.options[0];
  
  for (let i = 0; i < event.options.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      selectedOption = event.options[i];
      break;
    }
  }
  
  const moneyChange = calculateMoneyChange(selectedOption);
  
  return { option: selectedOption, moneyChange };
};
