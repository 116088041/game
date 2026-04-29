// 游戏随机事件定义
export interface GameEventOption {
  text: string;
  moneyChange: number; // 金额变化
  description: string; // 结果描述
  probability?: number; // 概率权重
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  icon: string; // 图标名称
  type: 'work' | 'investment' | 'consumption' | 'opportunity' | 'risk';
  options: GameEventOption[];
}

export const gameEvents: GameEvent[] = [
  // 工作类事件
  {
    id: 'work_1',
    title: '找工作',
    description: '街边看到一家店在招工，要不要去试试？',
    icon: 'Briefcase',
    type: 'work',
    options: [
      { text: '去面试服务员', moneyChange: 80, description: '恭喜！面试成功，今天收入 +80元' },
      { text: '去面试搬运工', moneyChange: 120, description: '辛苦但工资高，今天收入 +120元' },
      { text: '假装路过', moneyChange: 0, description: '你假装路过，错过机会' }
    ]
  },
  {
    id: 'work_2',
    title: '发传单',
    description: '有人问你要不要发传单赚点外快',
    icon: 'FileText',
    type: 'work',
    options: [
      { text: '接受发传单', moneyChange: 50, description: '发了一下午传单，赚了 +50元' },
      { text: '讨价还价', moneyChange: 70, description: '成功谈下更高价格，收入 +70元' },
      { text: '拒绝', moneyChange: 0, description: '你拒绝了，继续往前走' }
    ]
  },
  {
    id: 'work_3',
    title: '外卖骑手',
    description: '看到外卖平台在招骑手，送一单赚一单的钱',
    icon: 'Bike',
    type: 'work',
    options: [
      { text: '加入骑手大军', moneyChange: 100, description: '今天跑了10单，收入 +100元' },
      { text: '只接远单', moneyChange: 150, description: '专挑远单，收入 +150元' },
      { text: '算了太累了', moneyChange: 0, description: '你放弃了，今天没有收入' }
    ]
  },
  // 投资类事件
  {
    id: 'invest_1',
    title: '股票市场',
    description: '路过证券交易所，看到有人在讨论股票',
    icon: 'TrendingUp',
    type: 'investment',
    options: [
      { text: '买低价股试试', moneyChange: 200, description: '运气不错，股票涨了！收益 +200元' },
      { text: 'all in一支股', moneyChange: 500, description: '赌赢了！收益 +500元', probability: 0.3 },
      { text: '看看就好', moneyChange: 0, description: '谨慎起见，你选择观望' }
    ]
  },
  {
    id: 'invest_2',
    title: '摆地摊',
    description: '发现一个好位置可以摆地摊，进货需要花50元',
    icon: 'Store',
    type: 'investment',
    options: [
      { text: '进货卖玩具', moneyChange: 80, description: '生意不错，扣除成本净赚 +80元' },
      { text: '卖小吃', moneyChange: 120, description: '小吃很受欢迎，净赚 +120元' },
      { text: '不摆了', moneyChange: -20, description: '犹豫了半天没摆成，还亏了路费 -20元' }
    ]
  },
  {
    id: 'invest_3',
    title: '彩票站',
    description: '路过彩票站，2块钱就有机会中大奖',
    icon: 'Ticket',
    type: 'investment',
    options: [
      { text: '买一张试试', moneyChange: 1000, description: '中了小奖！+1000元', probability: 0.2 },
      { text: '买五张', moneyChange: 200, description: '中了个小奖，+200元', probability: 0.4 },
      { text: '不买赌博', moneyChange: 0, description: '你深知小赌怡情，大赌伤身' }
    ]
  },
  // 消费类事件
  {
    id: 'consume_1',
    title: '饥饿难耐',
    description: '肚子咕咕叫，路边看到美食摊',
    icon: 'Utensils',
    type: 'consumption',
    options: [
      { text: '吃碗面条', moneyChange: -15, description: '热乎乎的面条真香，花费 -15元' },
      { text: '买包子', moneyChange: -5, description: '买了两个包子，花费 -5元' },
      { text: '忍着不吃了', moneyChange: 0, description: '省钱要紧，忍一忍就过去了' }
    ]
  },
  {
    id: 'consume_2',
    title: '打折促销',
    description: '商场大促销，全场五折起！',
    icon: 'ShoppingBag',
    type: 'consumption',
    options: [
      { text: '买件新衣服', moneyChange: -80, description: '新衣服真帅！花费 -80元' },
      { text: '忍住不买', moneyChange: 0, description: '理智消费，一分钱都不花' },
      { text: '买买买', moneyChange: -200, description: '管不住手，花费 -200元' }
    ]
  },
  {
    id: 'consume_3',
    title: '网吧上网',
    description: '看到网吧在做活动，5元一小时',
    icon: 'Monitor',
    type: 'consumption',
    options: [
      { text: '玩两小时', moneyChange: -10, description: '放松一下，花费 -10元' },
      { text: '包夜才30', moneyChange: -30, description: '包夜打游戏，花费 -30元' },
      { text: '回家睡觉', moneyChange: 0, description: '早睡早起身体好' }
    ]
  },
  // 机遇类事件
  {
    id: 'opportunity_1',
    title: '捡到钱包',
    description: '走路时发现地上有一个鼓鼓的钱包',
    icon: 'Wallet',
    type: 'opportunity',
    options: [
      { text: '交给警察叔叔', moneyChange: 200, description: '失主给了感谢费！+200元' },
      { text: '自己留着', moneyChange: 100, description: '偷偷留下，花了里面的钱 +100元' },
      { text: '原地等待失主', moneyChange: 50, description: '等了半天，失主给了50元感谢费' }
    ]
  },
  {
    id: 'opportunity_2',
    title: '街头采访',
    description: '有人在做街头采访，说回答问题就有红包',
    icon: 'Mic',
    type: 'opportunity',
    options: [
      { text: '接受采访', moneyChange: 50, description: '回答了几个问题，获得 +50元' },
      { text: '成为网红', moneyChange: 500, description: '视频火了！获得打赏 +500元', probability: 0.2 },
      { text: '害羞走开', moneyChange: 0, description: '太紧张了，错过了机会' }
    ]
  },
  {
    id: 'opportunity_3',
    title: '代驾接单',
    description: '手机收到代驾平台推送，附近有人需要代驾',
    icon: 'Car',
    type: 'opportunity',
    options: [
      { text: '接单代驾', moneyChange: 150, description: '安全送达，获得代驾费 +150元' },
      { text: '接个远单', moneyChange: 300, description: '长途订单，费用更高 +300元' },
      { text: '不接单', moneyChange: 0, description: '今天太累了，不想接单' }
    ]
  },
  // 风险类事件
  {
    id: 'risk_1',
    title: '遇到骗子',
    description: '有人向你推销神奇保健品，说能治百病',
    icon: 'AlertTriangle',
    type: 'risk',
    options: [
      { text: '买一盒试试', moneyChange: -200, description: '回家发现是假货！损失 -200元' },
      { text: '报警举报', moneyChange: 50, description: '警察叔叔奖励了你 +50元' },
      { text: '赶紧跑', moneyChange: 0, description: '识破骗局，安全离开' }
    ]
  },
  {
    id: 'risk_2',
    title: '生病了',
    description: '突然感觉身体不舒服，可能是感冒了',
    icon: 'Thermometer',
    type: 'risk',
    options: [
      { text: '去医院看病', moneyChange: -100, description: '医生开了药，花费 -100元' },
      { text: '去药店买点药', moneyChange: -30, description: '买了感冒药，花费 -30元' },
      { text: '硬扛过去', moneyChange: 0, description: '多喝热水，睡一觉就好了' }
    ]
  },
  {
    id: 'risk_3',
    title: '手机摔了',
    description: '不小心手机从口袋滑出来，屏幕裂了',
    icon: 'Smartphone',
    type: 'risk',
    options: [
      { text: '去维修店', moneyChange: -150, description: '换了新屏幕，花费 -150元' },
      { text: '贴个膜凑合', moneyChange: -20, description: '凑合能用，花费 -20元' },
      { text: '不修了', moneyChange: 0, description: '裂缝不影响使用，省钱了' }
    ]
  },
  {
    id: 'risk_4',
    title: '违章罚款',
    description: '收到短信提醒，你骑电动车违规被拍了',
    icon: 'Camera',
    type: 'risk',
    options: [
      { text: '认罚缴纳', moneyChange: -50, description: '乖乖交了罚款 -50元' },
      { text: '申诉试试', moneyChange: 0, description: '申诉失败，但也没扣钱', probability: 0.5 },
      { text: '无视它', moneyChange: -100, description: '拖太久产生滞纳金 -100元' }
    ]
  },
  {
    id: 'work_4',
    title: '快递分拣',
    description: '快递站招临时工，工作简单但比较累',
    icon: 'Package',
    type: 'work',
    options: [
      { text: '去干一天', moneyChange: 120, description: '分拣了一整天，赚了 +120元' },
      { text: '只干半天', moneyChange: 60, description: '只干了半天，赚了 +60元' },
      { text: '太累了不去', moneyChange: 0, description: '看了看堆成山的快递，放弃了' }
    ]
  },
  {
    id: 'invest_4',
    title: '合伙开店',
    description: '朋友邀请你一起开个小店，需要投资500元',
    icon: 'Users',
    type: 'investment',
    options: [
      { text: '投资入股', moneyChange: 300, description: '小店生意不错！分红 +300元', probability: 0.6 },
      { text: '多投一些', moneyChange: 800, description: '投资多分红多！收益 +800元', probability: 0.4 },
      { text: '拒绝合伙', moneyChange: 0, description: '谨慎起见，还是算了' }
    ]
  },
  {
    id: 'opportunity_4',
    title: '朋友请客',
    description: '好久不见的老同学请你吃饭',
    icon: 'Coffee',
    type: 'opportunity',
    options: [
      { text: '欣然赴约', moneyChange: 50, description: '吃完还打包了，省了顿饭钱 +50元' },
      { text: 'AA制赴约', moneyChange: 0, description: '主动AA，大家都很愉快' },
      { text: '找借口不去', moneyChange: 0, description: '错过了社交机会' }
    ]
  },
  {
    id: 'consume_4',
    title: '充话费的诱惑',
    description: '手机收到短信，充100送50',
    icon: 'Phone',
    type: 'consumption',
    options: [
      { text: '充值100', moneyChange: -100, description: '充了100送了50，花费 -100元，但得到150话费' },
      { text: '充值50', moneyChange: -50, description: '充了50送了20，花费 -50元' },
      { text: '不充了', moneyChange: 0, description: '现在话费还够用' }
    ]
  },
  {
    id: 'risk_5',
    title: '借钱',
    description: '路边有人向你借钱，说第二天还',
    icon: 'Banknote',
    type: 'risk',
    options: [
      { text: '借50元', moneyChange: -50, description: '说好第二天还，结果人跑了！损失 -50元' },
      { text: '象征性借10块', moneyChange: -10, description: '给了10块，他说会还，但也没还 -10元' },
      { text: '无情拒绝', moneyChange: 0, description: '果断拒绝，防止被骗' }
    ]
  }
];

// 根据类型获取事件
export const getEventsByType = (type: GameEvent['type']) => {
  return gameEvents.filter(event => event.type === type);
};

// 随机获取一个事件
export const getRandomEvent = () => {
  const randomIndex = Math.floor(Math.random() * gameEvents.length);
  return gameEvents[randomIndex];
};
