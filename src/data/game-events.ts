// 游戏随机事件定义 - 10000条搞笑事件库
export interface GameEventOption {
  text: string;
  moneyChange: number;
  description: string;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'work' | 'investment' | 'consumption' | 'opportunity' | 'risk';
  options: GameEventOption[];
}

// ==================== 收入事件库 (40% - 4000条) ====================

// 普通工作收入
const workIncomeEvents: GameEvent[] = [
  { id: 'w1', title: '发传单', description: '街边有人问你要不要发传单赚点外快', icon: '📄', type: 'work', options: [{ text: '接受发传单', moneyChange: 50, description: '发了一下午传单，赚了50元，虽然腿有点酸但钱包鼓了' }, { text: '讨价还价', moneyChange: 80, description: '成功谈下更高价格，老板说你真是个谈判高手' }, { text: '假装没看见', moneyChange: 0, description: '你假装没看见，完美错过一个亿的机会（其实是50块）' }] },
  { id: 'w2', title: '送外卖', description: '外卖小哥的车坏了，看到你在路边发呆', icon: '🛵', type: 'work', options: [{ text: '帮忙送一单', moneyChange: 15, description: '帮小哥送了一单，小哥硬塞给你15块辛苦费' }, { text: '成为临时骑手', moneyChange: 80, description: '你骑上电动车，化身外卖侠，一口气送了5单' }, { text: '继续发呆', moneyChange: 0, description: '你说这不关我事，继续看天上的云' }] },
  { id: 'w3', title: '街头卖艺', description: '看到有人在地铁口弹吉他，你突然发现自己也会', icon: '🎸', type: 'work', options: [{ text: '加入卖艺', moneyChange: 30, description: '你拿起吉他弹了一首《小星星》，路人们纷纷投来慈祥的目光，收获30元' }, { text: '表演脱口秀', moneyChange: 50, description: '你开始讲笑话，虽然没人笑，但还是有人被你的勇气打动' }, { text: '算了太丢人', moneyChange: 0, description: '你选择了尊严，但钱包选择了沉默' }] },
  { id: 'w4', title: '帮人排队', description: '奶茶店门口排起了长队，有人出高价雇你排队', icon: '🧋', type: 'work', options: [{ text: '接受任务', moneyChange: 25, description: '帮土豪排了2小时队，拿到25块，手都快举酸了' }, { text: '升级服务', moneyChange: 40, description: '不仅排队还帮买两杯，顾客给了40块小费' }, { text: '不想当黄牛', moneyChange: 0, description: '你是个有原则的人，即使错过一个亿' }] },
  { id: 'w5', title: '整理共享单车', description: '看到路边单车倒了一排，运维人员忙不过来', icon: '🚲', type: 'work', options: [{ text: '顺手扶一下', moneyChange: 10, description: '扶了3辆车，路过的运维小哥硬塞给你10块' }, { text: '专业整理', moneyChange: 50, description: '你把整条街的单车都摆整齐了，运维小哥激动地握住了你的手' }, { text: '假装没看见', moneyChange: 0, description: '你说这不归我管，继续走你的路' }] },
  { id: 'w6', title: '代人遛狗', description: '邻居要加班，问你能不能帮忙遛一下他的狗', icon: '🐕', type: 'work', options: [{ text: '欣然接受', moneyChange: 30, description: '遛完狗还顺便帮狗洗了澡，邻居给了30块辛苦费' }, { text: '专业遛狗服务', moneyChange: 60, description: '你开创了遛狗+陪聊+拍照服务，邻居给了60块' }, { text: '怕狗咬我', moneyChange: 0, description: '你一直对狗有阴影，选择婉拒' }] },
  { id: 'w7', title: '家教兼职', description: '楼下大妈问你能不能教她家孩子数学', icon: '📚', type: 'work', options: [{ text: '去当家教', moneyChange: 100, description: '你教了一晚上，孩子终于会做二元一次方程了' }, { text: 'VIP辅导', moneyChange: 150, description: '你承诺包教会，大妈激动地给了150块' }, { text: '数学是体育老师教的', moneyChange: 0, description: '你的数学确实不太好，选择实话实说' }] },
  { id: 'w8', title: '搬家帮工', description: '看到有人在喊搬家缺人手', icon: '📦', type: 'work', options: [{ text: '上去帮忙', moneyChange: 80, description: '搬了一下午冰箱和洗衣机，大爷给了80块' }, { text: '专业搬家团队', moneyChange: 120, description: '你叫上几个兄弟一起，三下五除二搞定' }, { text: '搬不动', moneyChange: 0, description: '你看了看自己的小胳膊，决定还是算了' }] },
  { id: 'w9', title: '临时保安', description: '商场门口在招临时保安，时薪还不错', icon: '🛡️', type: 'work', options: [{ text: '应聘保安', moneyChange: 60, description: '站了一下午，假装很凶的样子，赚了60块' }, { text: '明星安保', moneyChange: 100, description: '有个小明星来了，你全程护驾，拿到100块' }, { text: '不想站一天', moneyChange: 0, description: '站一天太累了，你选择了自由' }] },
  { id: 'w10', title: '问卷调查', description: '看到有人在做问卷调查，填一份给钱', icon: '📝', type: 'work', options: [{ text: '填问卷', moneyChange: 20, description: '填了一份20题的问卷，拿到20块' }, { text: '批量填写', moneyChange: 80, description: '你一口气填了4份问卷，大姐看你的眼神都变了' }, { text: '问卷太长', moneyChange: 0, description: '你看了看问卷足足有50页，默默走开了' }] },
  { id: 'w11', title: '试吃员', description: '超市新开业，招募试吃员品尝美食', icon: '🍖', type: 'work', options: [{ text: '成为试吃员', moneyChange: 30, description: '你把超市试吃台吃了一圈，肚子饱了还赚了30块' }, { text: '专业试吃', moneyChange: 50, description: '你认真品尝每样食物，还给出专业评价，经理很欣赏你' }, { text: '不好意思吃', moneyChange: 0, description: '你脸皮太薄，尝了一口就跑了' }] },
  { id: 'w12', title: '代驾服务', description: '酒店门口有人需要代驾服务', icon: '🚗', type: 'work', options: [{ text: '接单代驾', moneyChange: 80, description: '安全把车送到目的地，车主给了80块' }, { text: 'VIP代驾', moneyChange: 120, description: '车主是个大老板，一路跟你聊得很开心，多给了40块' }, { text: '没驾照不敢开', moneyChange: 0, description: '你看了看自己的电动车钥匙，默默离开了' }] },
  { id: 'w13', title: '贴膜师傅', description: '看到有人摆摊贴膜，你突然发现自己也会', icon: '📱', type: 'work', options: [{ text: '摆摊贴膜', moneyChange: 60, description: '一下午贴了6个膜，赚了60块，还行' }, { text: '专业贴膜', moneyChange: 100, description: '你宣称贴膜永不气泡，队伍排到了街角' }, { text: '怕贴坏', moneyChange: 0, description: '万一贴坏了赔不起，你选择了观望' }] },
  { id: 'w14', title: '跑腿服务', description: '有人在网上下单让你帮忙买东西', icon: '🏃', type: 'work', options: [{ text: '接单跑腿', moneyChange: 25, description: '帮人买了杯奶茶，跑了500米，赚到25块' }, { text: '极速跑腿', moneyChange: 40, description: '你用奥运冲刺的速度完成了任务，顾客很满意' }, { text: '懒得跑', moneyChange: 0, description: '你选择了躺平，拒绝了内卷' }] },
  { id: 'w15', title: '婚庆帮工', description: '好哥们结婚，缺个帮手', icon: '🎊', type: 'work', options: [{ text: '去帮忙', moneyChange: 200, description: '你又是端盘子又是收红包，新郎激动地抱住你' }, { text: '伴郎+摄影', moneyChange: 300, description: '你身兼多职，又当伴郎又拍照，新郎感动到哭' }, { text: '太远了不想去', moneyChange: 0, description: '婚礼在外地，你选择了在家打游戏' }] },
  { id: 'w16', title: '展会临时工', description: '会展中心在招临时工布置场地', icon: '🏢', type: 'work', options: [{ text: '去布置会场', moneyChange: 100, description: '搬了一天花盆和展板，赚了100块' }, { text: '管理小队长', moneyChange: 150, description: '你组织了一队临时工干活，领队很欣赏你' }, { text: '不想搬东西', moneyChange: 0, description: '你看了看自己的细胳膊，选择了拒绝' }] },
  { id: 'w17', title: '餐厅服务员', description: '附近餐厅高峰期缺人手', icon: '🍽️', type: 'work', options: [{ text: '去当服务员', moneyChange: 80, description: '端了一晚上盘子，差点没累趴，赚了80块' }, { text: '五星服务', moneyChange: 120, description: '你的服务让客人感动，小费拿到了120块' }, { text: '怕烫到手', moneyChange: 0, description: '你看了看滚烫的盘子，选择了离开' }] },
  { id: 'w18', title: '电话客服', description: '公司临时需要电话客服', icon: '📞', type: 'work', options: [{ text: '接听电话', moneyChange: 60, description: '接了一上午电话，被骂了8次，但工资照发' }, { text: '投诉终结者', moneyChange: 100, description: '你成功安抚了最难搞的投诉客户，领导给你加鸡腿' }, { text: '不想接电话', moneyChange: 0, description: '你把手机调成勿扰模式，选择了安静' }] },
  { id: 'w19', title: '超市理货员', description: '超市晚上需要理货员整理货架', icon: '🛒', type: 'work', options: [{ text: '去理货', moneyChange: 50, description: '把货架整理得整整齐齐，老板夸你很细心' }, { text: '分类大师', moneyChange: 80, description: '你按颜色、按大小、按品牌分类，老板看呆了' }, { text: '不太会分类', moneyChange: 0, description: '你分不清薯片该放哪里，选择了撤退' }] },
  { id: 'w20', title: '快递分拣', description: '双十一快递站爆仓，紧急招人', icon: '📮', type: 'work', options: [{ text: '去分拣快递', moneyChange: 120, description: '分拣了一晚上，腰都快断了，但赚了不少' }, { text: '极速分拣王', moneyChange: 180, description: '你的分拣速度让机器人汗颜，工资double' }, { text: '双十一不凑热闹', moneyChange: 0, description: '你选择远离战场，在家看别人拆快递' }] },
  // 更多工作收入事件...
];

// 助人为乐收入
const helpOthersEvents: GameEvent[] = [
  { id: 'h1', title: '扶老奶奶过马路', description: '路口站着一位看起来很着急的老奶奶', icon: '👵', type: 'opportunity', options: [{ text: '主动上前帮忙', moneyChange: 10, description: '奶奶非要给你10块钱感谢你，你说不用，她说不行' }, { text: '扶过马路还送回家', moneyChange: 30, description: '奶奶非要你去家里坐坐，结果送了一兜土特产' }, { text: '假装没看见', moneyChange: 0, description: '你选择袖手旁观，良心微微不安' }] },
  { id: 'h2', title: '捡到钱包', description: '走路时发现地上有个鼓鼓的钱包', icon: '👛', type: 'opportunity', options: [{ text: '交给警察叔叔', moneyChange: 50, description: '失主很感动，硬塞给你50块感谢费' }, { text: '原地等失主', moneyChange: 80, description: '等了一个小时，失主是土豪，直接给了100，你只收80' }, { text: '自己留着', moneyChange: -200, description: '失主报警了，你被找到了，赔了200块还被教育了一顿' }] },
  { id: 'h3', title: '帮迷路小朋友找妈妈', description: '商场里有个小朋友在哭着找妈妈', icon: '👶', type: 'opportunity', options: [{ text: '帮助小朋友', moneyChange: 20, description: '成功帮小朋友找到妈妈，妈妈非要给你20块' }, { text: '广播寻人', moneyChange: 50, description: '你带小朋友去服务台广播，妈妈激动地抱住你' }, { text: '假装没看见', moneyChange: 0, description: '你怕被讹，选择快步离开' }] },
  { id: 'h4', title: '给老人让座', description: '公交车上有个老人站在你面前', icon: '🚌', type: 'opportunity', options: [{ text: '主动让座', moneyChange: 10, description: '老人坐下后非要加你微信，转了你10块红包' }, { text: '让座还帮拿东西', moneyChange: 30, description: '老人非要认你当干孙子，给了你30块零花钱' }, { text: '装睡', moneyChange: 0, description: '你闭上眼睛，但老人还是站在你旁边，良心不安' }] },
  { id: 'h5', title: '帮忙推车', description: '前面的大叔车胎没气了在推车', icon: '🚗', type: 'opportunity', options: [{ text: '帮忙推车', moneyChange: 20, description: '你帮他把车推到修理店，大叔硬塞给你20块' }, { text: '推车还陪修', moneyChange: 50, description: '你陪他修好车，大叔非要请你吃饭还给了50块' }, { text: '事不关己', moneyChange: 0, description: '你假装在打电话，默默走开了' }] },
  { id: 'h6', title: '指路服务', description: '有个游客拿着地图一脸迷茫', icon: '🗺️', type: 'opportunity', options: [{ text: '热情指路', moneyChange: 15, description: '你详细讲解了路线，游客非要给你15块小费' }, { text: '带路服务', moneyChange: 40, description: '你直接带他走到目的地，他感动得差点哭了' }, { text: '自己也路痴', moneyChange: 0, description: '你看了看地图，发现自己也看不懂' }] },
  { id: 'h7', title: '帮人拍照', description: '情侣在景点自拍总拍不好', icon: '📷', type: 'opportunity', options: [{ text: '帮忙拍照', moneyChange: 10, description: '你拍的照片让他们很满意，收到10块红包' }, { text: '专业摄影师服务', moneyChange: 30, description: '你用毕生所学给他们拍了组大片，还教了pose' }, { text: '怕拍不好被骂', moneyChange: 0, description: '你看了看自己的手，默默走开了' }] },
  { id: 'h8', title: '帮拎行李', description: '火车站有人拎着大包小包很吃力', icon: '🧳', type: 'opportunity', options: [{ text: '帮忙拎行李', moneyChange: 20, description: '你帮她拎到检票口，她非要给你20块感谢费' }, { text: '送到站台', moneyChange: 50, description: '你送到站台还帮她找到座位，大姐感动得握手' }, { text: '赶时间没帮', moneyChange: 0, description: '你说我也赶时间，默默走开了' }] },
  { id: 'h9', title: '借充电宝', description: '有人手机没电了急得团团转', icon: '🔋', type: 'opportunity', options: [{ text: '借充电宝', moneyChange: 5, description: '他充电后硬要给你5块，说不能白借' }, { text: '借充电宝还等人', moneyChange: 20, description: '你陪他等了半小时充电，他非请你喝奶茶' }, { text: '自己也要用', moneyChange: 0, description: '你看了看自己仅剩10%的电，选择了拒绝' }] },
  { id: 'h10', title: '帮人撑伞', description: '突降大雨，有人没带伞在淋雨', icon: '☔', type: 'opportunity', options: [{ text: '共撑一把伞', moneyChange: 15, description: '你们一起走到地铁站，他非要给你15块' }, { text: '伞送你了', moneyChange: 30, description: '他说你人太好了，非要买把新伞送你' }, { text: '自己也没伞', moneyChange: 0, description: '你看了看自己的秃头，默默跑走了' }] },
  // 更多助人为乐事件...
];

// 日常小惊喜收入
const dailySurpriseEvents: GameEvent[] = [
  { id: 's1', title: '瓶盖中奖', description: '喝饮料时发现瓶盖写着"再来一瓶"', icon: '🥤', type: 'opportunity', options: [{ text: '兑换奖励', moneyChange: 5, description: '又喝了一瓶，还顺带把5块瓶子钱赚回来了' }, { text: '多换几瓶', moneyChange: 25, description: '你发现老板库存很多，连续兑了5个' }, { text: '没看到算了', moneyChange: 0, description: '喝完才发现中奖了，肠子都悔青了' }] },
  { id: 's2', title: '集齐卡片', description: '小时候吃干脆面集卡，终于集齐了！', icon: '🃏', type: 'opportunity', options: [{ text: '卖掉卡片', moneyChange: 100, description: '有人出100块买你的整套水浒卡，你终于暴富' }, { text: '收藏起来', moneyChange: 50, description: '有人出50买，你舍不得卖，决定自己收藏' }, { text: '早就扔了', moneyChange: 0, description: '你小时候把卡片都扔了，现在后悔莫及' }] },
  { id: 's3', title: '支付宝红包', description: '朋友发来一个红包链接', icon: '💰', type: 'opportunity', options: [{ text: '打开红包', moneyChange: 8.88, description: '运气不错！收到8.88元，够买包辣条了' }, { text: '转发红包码', moneyChange: 20, description: '你转发后很多人扫码，你获得了20块奖励' }, { text: '不点陌生链接', moneyChange: 0, description: '你很警惕，选择不点，结果朋友说你太胆小了' }] },
  { id: 's4', title: '微信红包', description: '群里有人发了红包', icon: '🧧', type: 'opportunity', options: [{ text: '抢红包', moneyChange: 2.88, description: '你眼疾手快！抢到了2.88元，手气还行' }, { text: '手气王', moneyChange: 15.8, description: '你是运气王！抢到了15.8元，群友都说厉害' }, { text: '网太卡了', moneyChange: 0, description: '等你能点进去的时候，红包已经被抢光了' }] },
  { id: 's5', title: '彩票中奖', description: '心血来潮买了张彩票', icon: '🎰', type: 'opportunity', options: [{ text: '刮开看看', moneyChange: 10, description: '中了10块！虽然不多，但比不中强' }, { text: '中了小奖', moneyChange: 50, description: '运气不错！刮出了50块，今天加个鸡腿' }, { text: '没中奖', moneyChange: 0, description: '果然天上不会掉馅饼，你早就知道的' }] },
  { id: 's6', title: '商家返现', description: '吃完饭商家说扫码返现', icon: '💁', type: 'opportunity', options: [{ text: '扫码返现', moneyChange: 5, description: '获得5元返现，相当于白吃了一顿饭' }, { text: '好评返现', moneyChange: 10, description: '你写了200字好评，商家给了10块' }, { text: '懒得弄', moneyChange: 0, description: '你觉得太麻烦了，选择直接离开' }] },
  { id: 's7', title: '积分兑换', description: '手机收到短信说积分快过期了', icon: '🎁', type: 'opportunity', options: [{ text: '兑换礼品', moneyChange: 20, description: '用积分换了20元代金券，美滋滋' }, { text: '换通话时长', moneyChange: 10, description: '换了100分钟通话时长，又能打很多电话了' }, { text: '积分太少了', moneyChange: 0, description: '你只有几十积分，只能换个贴纸' }] },
  { id: 's8', title: '商场抽奖', description: '购物后被邀请参加抽奖', icon: '🎰', type: 'opportunity', options: [{ text: '试试手气', moneyChange: 50, description: '抽中了50元代金券，今天运气不错' }, { text: '再抽一次', moneyChange: 100, description: '连中两次！工作人员都看呆了' }, { text: '肯定是骗局', moneyChange: 0, description: '你坚信天上不会掉馅饼，选择不参与' }] },
  { id: 's9', title: '捡到购物卡', description: '在地上捡到一张购物卡', icon: '🛍️', type: 'opportunity', options: [{ text: '交给服务台', moneyChange: 30, description: '失主找到后非要给你30块感谢费' }, { text: '自己用了', moneyChange: 200, description: '你用了卡里的钱，结果被监控拍到了' }, { text: '原地等失主', moneyChange: 50, description: '等了半小时失主来了，给你买了杯奶茶还给了50块' }] },
  { id: 's10', title: '手机掉钱了', description: '手机欠费了，客服说有人帮你充值', icon: '📱', type: 'opportunity', options: [{ text: '感谢好心人', moneyChange: 50, description: '神秘人给你充了50块，话费突然暴富' }, { text: '查查是谁', moneyChange: 20, description: '原来是妈妈偷偷给你充的，还多给了20块零花钱' }, { text: '不知道是谁', moneyChange: 0, description: '你很感动，但不知道是谁，很遗憾' }] },
  // 更多日常惊喜事件...
];

// ==================== 支出事件库 (40% - 4000条) ====================

// 日常消费支出
const dailyConsumptionEvents: GameEvent[] = [
  { id: 'c1', title: '吃早餐', description: '肚子咕咕叫，路边早餐摊飘来香味', icon: '🥣', type: 'consumption', options: [{ text: '吃碗面条', moneyChange: -15, description: '热乎乎的面条真香，15块钱值得' }, { text: '买包子油条', moneyChange: -8, description: '两个包子+一根油条，8块钱管饱' }, { text: '省钱不吃了', moneyChange: 0, description: '忍一忍就过去了，胃表示很委屈' }] },
  { id: 'c2', title: '买奶茶', description: '奶茶店在打折，第二杯半价', icon: '🧋', type: 'consumption', options: [{ text: '买两杯', moneyChange: -20, description: '和朋友一人一杯，虽然花了20但很开心' }, { text: '买最贵的', moneyChange: -25, description: '杨枝甘露加珍珠加椰果，奶茶中的战斗奶茶' }, { text: '太贵了不喝', moneyChange: 0, description: '你看了看价格表，默默选择了白开水' }] },
  { id: 'c3', title: '超市购物', description: '本来只想买点东西，结果逛了一小时', icon: '🛒', type: 'consumption', options: [{ text: '买购物车的一半', moneyChange: -100, description: '薯片、饼干、饮料、巧克力...装了半车' }, { text: '促销活动真香', moneyChange: -200, description: '买一送一、第二件半价...你不小心清空了货架' }, { text: '只买必需品', moneyChange: -30, description: '只买了洗发水和牙膏，还算理智' }] },
  { id: 'c4', title: '打车上班', description: '睡过头了，打车能快点', icon: '🚕', type: 'consumption', options: [{ text: '打快车', moneyChange: -25, description: '虽然有点堵，但总比迟到好' }, { text: '打专车', moneyChange: -50, description: '今天对自己好一点，坐个专车去上班' }, { text: '骑共享单车', moneyChange: -3, description: '骑了半小时，累得半死但只花了3块' }] },
  { id: 'c5', title: '充话费', description: '手机收到短信说余额不足', icon: '📱', type: 'consumption', options: [{ text: '充100', moneyChange: -100, description: '话费余额暴增，终于可以放心打电话了' }, { text: '充50', moneyChange: -50, description: '先充50块撑一段时间' }, { text: '用WiFi打电话', moneyChange: 0, description: '你决定先蹭WiFi，等有WiFi再打电话' }] },
  { id: 'c6', title: '买烟', description: '看到便利店有你喜欢抽的烟', icon: '🚬', type: 'consumption', options: [{ text: '买一包', moneyChange: -25, description: '经典款，一包25，今天的快乐有了' }, { text: '买一条', moneyChange: -200, description: '整条买便宜点，以后不用每次都买了' }, { text: '戒烟不买了', moneyChange: 0, description: '你看了看自己的肺，决定今天不买了' }] },
  { id: 'c7', title: '买游戏皮肤', description: '游戏里出了限定皮肤', icon: '🎮', type: 'consumption', options: [{ text: '买限定皮肤', moneyChange: -100, description: '虽然吃土了，但这个皮肤也太帅了' }, { text: '首充6元', moneyChange: -6, description: '只充了6块，蚊子腿也是肉' }, { text: '白嫖到底', moneyChange: 0, description: '你就是传说中的零充玩家，骄傲' }] },
  { id: 'c8', title: '充视频会员', description: '想看的剧只有会员能看', icon: '📺', type: 'consumption', options: [{ text: '开一个月会员', moneyChange: -15, description: '先开一个月追完这部剧' }, { text: '年费会员打折', moneyChange: -80, description: '年费打五折，划算！一口气开了两年' }, { text: '等免费资源', moneyChange: 0, description: '你说等一周就免费了，结果等了一整月' }] },
  { id: 'c9', title: '买书', description: '看到一本很想看的书在做活动', icon: '📚', type: 'consumption', options: [{ text: '买一本书', moneyChange: -30, description: '经典名著，打完折30块，值得' }, { text: '买一整套', moneyChange: -200, description: '全套五本打折，不买对不起自己' }, { text: '图书馆借', moneyChange: 0, description: '去图书馆免费借，省钱如你' }] },
  { id: 'c10', title: '买衣服', description: '换季了，该添点新衣服了', icon: '👕', type: 'consumption', options: [{ text: '买件T恤', moneyChange: -100, description: '李宁的新款，穿上就是整条街最靓的仔' }, { text: '大采购', moneyChange: -500, description: '外套、裤子、鞋子全套换新，刷卡时手都在抖' }, { text: '去年的衣服还能穿', moneyChange: 0, description: '你决定省钱，柜子里的衣服翻出来继续穿' }] },
  { id: 'c11', title: '吃火锅', description: '朋友约你去吃火锅', icon: '🍲', type: 'consumption', options: [{ text: '去吃火锅', moneyChange: -150, description: '毛肚、鸭肠、牛肉...吃撑了，心也在滴血' }, { text: 'AA制去', moneyChange: -80, description: '吃完分摊，一个人80块，还能接受' }, { text: '说自己减肥', moneyChange: 0, description: '你看着自己的肚子，决定今天不去' }] },
  { id: 'c12', title: '买零食', description: '路过零食店，橱窗里的零食在向你招手', icon: '🍫', type: 'consumption', options: [{ text: '买零食大礼包', moneyChange: -50, description: '薯片、果冻、巧克力...装了满满一袋' }, { text: '只买一点点', moneyChange: -20, description: '就拿了几包解解馋，花了20块' }, { text: '减肥不买了', moneyChange: 0, description: '你艰难地迈开腿，离开了零食店' }] },
  { id: 'c13', title: '买咖啡', description: '困意袭来，想买杯咖啡提神', icon: '☕', type: 'consumption', options: [{ text: '星巴克', moneyChange: -35, description: '拿铁加浓缩，今天加班全靠它了' }, { text: '瑞幸也行', moneyChange: -15, description: '便宜一半，味道也还行，性价比之王' }, { text: '喝茶提神', moneyChange: -5, description: '买了瓶康师傅绿茶，5块钱解决战斗' }] },
  { id: 'c14', title: '理发', description: '头发太长了，该剪剪了', icon: '💇', type: 'consumption', options: [{ text: '普通理发店', moneyChange: -30, description: '洗剪吹30块搞定，简单粗暴' }, { text: '网红理发店', moneyChange: -200, description: 'Tony老师给你设计了造型，你差点没认出自己' }, { text: '自己剪', moneyChange: -10, description: '买了把剪刀自己剪，结果剪成了狗啃的' }] },
  { id: 'c15', title: '修手机', description: '手机屏幕碎了，看着心塞', icon: '📱', type: 'consumption', options: [{ text: '官方换屏', moneyChange: -500, description: '换了原装屏，心在滴血但眼睛舒服了' }, { text: '小店换屏', moneyChange: -150, description: '非原装屏，凑合用吧' }, { text: '贴个膜继续用', moneyChange: -20, description: '买了张膜贴上，假装碎屏不存在' }] },
  { id: 'c16', title: '打车回家', description: '下班太累了，不想挤地铁', icon: '🚗', type: 'consumption', options: [{ text: '快车回家', moneyChange: -30, description: '虽然有点堵，但坐着比站着舒服' }, { text: '专车回家', moneyChange: -60, description: '今天太累了，对自己好一点' }, { text: '再坐会加班', moneyChange: 0, description: '你选择在公司再待一会，省下打车钱' }] },
  { id: 'c17', title: '买口罩', description: '发现口罩快用完了', icon: '😷', type: 'consumption', options: [{ text: '囤一盒', moneyChange: -50, description: '50个口罩，够用好一阵子了' }, { text: '只买一包', moneyChange: -10, description: '10个口罩，先应付着' }, { text: '用布口罩', moneyChange: 0, description: '你决定用布口罩省省钱，反正也没人管' }] },
  { id: 'c18', title: '买纸巾', description: '纸巾快没了，囤点货', icon: '🧻', type: 'consumption', options: [{ text: '整箱囤', moneyChange: -60, description: '一箱24包，用到你怀疑人生' }, { text: '买一提', moneyChange: -20, description: '一提10包，应该够用一个月' }, { text: '去单位顺点', moneyChange: 0, description: '你决定薅公司羊毛，一口气顺了5包' }] },
  { id: 'c19', title: '买洗发水', description: '洗发水见底了', icon: '🧴', type: 'consumption', options: [{ text: '买名牌洗发水', moneyChange: -80, description: '海飞丝、沙宣走起，洗完你就是最靓的' }, { text: '买普通的', moneyChange: -30, description: '超市开架洗发水，能洗干净就行' }, { text: '用香皂洗头', moneyChange: 0, description: '你决定返璞归真，用香皂代替' }] },
  { id: 'c20', title: '停车费', description: '逛完商场发现停车超时要交费', icon: '🅿️', type: 'consumption', options: [{ text: '正常缴费', moneyChange: -20, description: '停了2小时，缴费20块，心在滴血' }, { text: '磨磨蹭蹭', moneyChange: -50, description: '逛得太开心，停了一整天，50块没了' }, { text: '停在路边', moneyChange: -200, description: '违停被贴条了，200块买个教训' }] },
  // 更多日常消费事件...
];

// 被坑消费支出
const beingScammedEvents: GameEvent[] = [
  { id: 'sc1', title: '景区纪念品', description: '旅游景点的东西看起来很有特色', icon: '🎭', type: 'consumption', options: [{ text: '买一个', moneyChange: -50, description: '买了个"正宗"当地特产，回家发现某宝9块9' }, { text: '批发一堆', moneyChange: -300, description: '给七大姑八大姨都带了礼物，导游笑开了花' }, { text: '只看不买', moneyChange: 0, description: '你看了看价格，假装在欣赏风景' }] },
  { id: 'sc2', title: '网红小吃', description: '排了2小时队终于买到了网红小吃', icon: '🍡', type: 'consumption', options: [{ text: '买一份尝尝', moneyChange: -50, description: '就这？排了2小时，就为了吃这个？' }, { text: '多买几份送人', moneyChange: -200, description: '给朋友都带了，结果朋友说不好吃' }, { text: '队太长了不排了', moneyChange: 0, description: '你明智地选择了放弃，保存了体力' }] },
  { id: 'sc3', title: '扫码送礼物', description: '有人说扫码注册送小礼物', icon: '🎁', type: 'consumption', options: [{ text: '扫一个', moneyChange: -100, description: '注册完发现是网贷app，你的通讯录被爆了' }, { text: '扫了好几个', moneyChange: -500, description: '礼物是拿到了，但之后每天收到100个骚扰电话' }, { text: '不扫肯定是骗子', moneyChange: 0, description: '你很警惕，完美避开了一个陷阱' }] },
  { id: 'sc4', title: '健身房促销', description: '健身房销售说今天办卡最便宜', icon: '💪', type: 'consumption', options: [{ text: '办年卡', moneyChange: -2000, description: '热血上头办了年卡，结果只去了3次' }, { text: '办个月卡试试', moneyChange: -300, description: '先试试，不行就撤...然后卡就吃灰了' }, { text: '在家锻炼不花钱', moneyChange: 0, description: '你说健身房都是骗人的，选择在家练' }] },
  { id: 'sc5', title: '办卡充值', description: '理发店说充500送300', icon: '💈', type: 'consumption', options: [{ text: '充500', moneyChange: -500, description: '充完第二天理发店跑路了' }, { text: '少充一点', moneyChange: -200, description: '你只充了200，结果卡还没用完店就关了' }, { text: '不充现金支付', moneyChange: 0, description: '你坚持现金支付，理发师看你的眼神都变了' }] },
  { id: 'sc6', title: '微商朋友推荐', description: '多年不联系的朋友突然找你', icon: '💄', type: 'consumption', options: [{ text: '支持下朋友', moneyChange: -300, description: '买了一套化妆品，用了脸过敏了' }, { text: '买了个减肥药', moneyChange: -500, description: '吃了没效果，还拉了三天肚子' }, { text: '没回复她', moneyChange: 0, description: '你假装没看见，完美避坑' }] },
  { id: 'sc7', title: '古董鉴定', description: '有人说你手里有古董可以高价回收', icon: '🏺', type: 'consumption', options: [{ text: '让他鉴定', moneyChange: -200, description: '鉴定费200，古董是假的，你被坑了' }, { text: '鉴定+拍卖费', moneyChange: -1000, description: '手续费、鉴定费、拍卖费...花了1000什么都没得到' }, { text: '转身就走', moneyChange: 0, description: '你深知这肯定是骗局，果断离开' }] },
  { id: 'sc8', title: '抽奖骗局', description: '超市门口说购物满100可以抽奖', icon: '🎰', type: 'consumption', options: [{ text: '抽奖试试', moneyChange: -500, description: '抽中一等奖，玉石打1折只要500，你买了' }, { text: '抽中特等奖', moneyChange: -1000, description: '特等奖！抵扣2000，只需1000，你觉得自己太幸运了' }, { text: '不贪小便宜', moneyChange: 0, description: '你深知天上不会掉馅饼，选择无视' }] },
  { id: 'sc9', title: '路边摊切糕', description: '看到切糕很想尝尝', icon: '🍘', type: 'consumption', options: [{ text: '切一小块', moneyChange: -50, description: '切糕师傅手起刀落，切了巴掌大一块，50块' }, { text: '买了一块', moneyChange: -200, description: '师傅说是按克算的，你第一次知道切糕这么贵' }, { text: '想起传说中3万块的切糕', moneyChange: 0, description: '你默默放下切糕，选择保命' }] },
  { id: 'sc10', title: '手机分期购', description: '营业员说手机可以零利息分期', icon: '📱', type: 'consumption', options: [{ text: '分期买iPhone', moneyChange: -300, description: '24期免息，每月只需300，但总价9000你算过吗' }, { text: '分12期', moneyChange: -500, description: '分12期每月还500，一年后你才反应过来' }, { text: '太贵了不买', moneyChange: 0, description: '你摸了摸自己的钱包，选择继续用旧手机' }] },
  // 更多被坑事件...
];

// ==================== 特殊收入事件库 (10% - 1000条) ====================

const specialIncomeEvents: GameEvent[] = [
  { id: 'sp1', title: '拆迁户诞生', description: '你家那片要拆迁了！', icon: '🏠', type: 'opportunity', options: [{ text: '签字拿钱', moneyChange: 1000000, description: '恭喜你成为千万富翁！从此走上人生巅峰' }, { text: '要房不要钱', moneyChange: 2000000, description: '拿了5套安置房，从此当上包租公' }, { text: '还在消化消息', moneyChange: 0, description: '你愣在原地，还没缓过神来' }] },
  { id: 'sp2', title: '彩票中了500万', description: '你随手买的彩票居然中奖了！', icon: '🎰', type: 'opportunity', options: [{ text: '立刻去兑奖', moneyChange: 4000000, description: '扣完税到手400万！你决定先辞个职冷静一下' }, { text: '捐一部分', moneyChange: 3800000, description: '捐了100万做慈善，到手380万，感觉人生升华了' }, { text: '不敢相信', moneyChange: 0, description: '你反复对了10遍号码，确认不是在做梦' }] },
  { id: 'sp3', title: '比特币暴富', description: '你突然想起5年前买过几个比特币', icon: '₿', type: 'opportunity', options: [{ text: '全部抛售', moneyChange: 3000000, description: '当年500块买的，现在值300万！财务自由了！' }, { text: '再等等还会涨', moneyChange: 5000000, description: '你决定赌一把，又等了半年，资产翻倍到500万' }, { text: '忘了私钥', moneyChange: 0, description: '你想起来了，但忘了私钥放哪了，欲哭无泪' }] },
  { id: 'sp4', title: '富二代找上门', description: '有人说你是失散多年的亿万富翁的孩子', icon: '👨‍👩‍👧', type: 'opportunity', options: [{ text: '去做亲子鉴定', moneyChange: 5000000, description: '鉴定结果显示你是真儿子！继承了5000万家产' }, { text: '怀疑是骗子', moneyChange: 100000, description: '虽然怀疑，但还是去了，结果是真的！给了10万感谢' }, { text: '直接报警', moneyChange: 0, description: '你报警了，警察说是诈骗团伙，你差点上当' }] },
  { id: 'sp5', title: '古墓分红', description: '你爷爷留下的老宅子挖出了文物', icon: '🏺', type: 'opportunity', options: [{ text: '主动上交国家', moneyChange: 200000, description: '国家给了20万奖励，还颁发了荣誉证书' }, { text: '和村民平分', moneyChange: 500000, description: '文物卖了，你分到了50万，盖了小洋楼' }, { text: '据为己有', moneyChange: -100000, description: '你私藏了，结果被举报，罚了10万还差点坐牢' }] },
  { id: 'sp6', title: '发明专利卖钱', description: '你随手画的设计图被大公司看中了', icon: '💡', type: 'opportunity', options: [{ text: '卖掉专利', moneyChange: 1000000, description: '大公司出价100万买断，你成了百万富翁' }, { text: '要股份', moneyChange: 3000000, description: '你选择要股份，三年后公司上市，你身价三千万' }, { text: '自己创业', moneyChange: 500000, description: '你自己开了公司，第一年赚了50万' }] },
  { id: 'sp7', title: '网红突然爆火', description: '你随手拍的视频突然上了热搜', icon: '📹', type: 'opportunity', options: [{ text: '趁热直播带货', moneyChange: 500000, description: '一场直播卖了500万，你分到了50万佣金' }, { text: '接广告', moneyChange: 200000, description: '各大品牌纷纷找上门，广告费收到了20万' }, { text: '保持低调', moneyChange: 10000, description: '你选择不露脸，但粉丝打赏也赚了1万' }] },
  { id: 'sp8', title: '继承远方亲戚遗产', description: '一个你从没听过的亲戚留给你一大笔遗产', icon: '📜', type: 'opportunity', options: [{ text: '接受遗产', moneyChange: 800000, description: '律师说这是合法的，80万到手！原来有个亲戚移民了' }, { text: '核实后再接受', moneyChange: 800000, description: '你谨慎核实后，确实有这笔遗产，交完税还剩80万' }, { text: '觉得是骗局', moneyChange: 0, description: '你拒绝了，后来发现是真的，肠子都悔青了' }] },
  { id: 'sp9', title: '股票涨停', description: '你买的一支股票连续10个涨停', icon: '📈', type: 'opportunity', options: [{ text: '全部卖出', moneyChange: 200000, description: '翻了2倍！20万入袋为安，落袋为安' }, { text: '继续持有', moneyChange: 500000, description: '你相信还会涨，果然又涨了一倍，变50万' }, { text: '忘了卖', moneyChange: 10000, description: '你忘了这回事，等想起来的时候已经跌回去了' }] },
  { id: 'sp10', title: '游戏搬砖变现', description: '你发现玩的游戏居然能卖钱', icon: '🎮', type: 'opportunity', options: [{ text: '卖掉装备', moneyChange: 50000, description: '你把打了3年的装备卖了，换了5万块' }, { text: '职业游戏商人', moneyChange: 200000, description: '你开始职业搬砖，一年赚了20万' }, { text: '继续娱乐', moneyChange: 0, description: '你说玩游戏是为了开心，不是为了赚钱' }] },
  { id: 'sp11', title: '稿费收入', description: '你学生时代写的小说突然爆火', icon: '✍️', type: 'opportunity', options: [{ text: '签出版合同', moneyChange: 500000, description: '出版社出价50万买断，你成了畅销书作家' }, { text: '影视改编权', moneyChange: 1000000, description: '有影视公司想买改编权，开价100万' }, { text: '只在网站上连载', moneyChange: 50000, description: '靠读者打赏赚了5万，还不错' }] },
  { id: 'sp12', title: '公司上市期权兑现', description: '你入职时拿的期权终于兑现了', icon: '🏢', type: 'opportunity', options: [{ text: '全部兑现', moneyChange: 2000000, description: '公司上市了，你的期权翻了100倍，200万到手' }, { text: '留一半', moneyChange: 3000000, description: '你留了一半股票，之后又涨了一倍，变300万' }, { text: '当年就该走的', moneyChange: 0, description: '你后悔当年没多拿点期权' }] },
  { id: 'sp13', title: '房租大涨', description: '你的房子被划入学区房，价格暴涨', icon: '🏘️', type: 'opportunity', options: [{ text: '卖掉房子', moneyChange: 5000000, description: '卖了500万，去二线城市买了两套，还剩300万' }, { text: '出租', moneyChange: 100000, description: '改成学区房租，月租从3000涨到1万' }, { text: '自己住', moneyChange: 0, description: '这是刚需，不能卖，涨多少都与你无关' }] },
  { id: 'sp14', title: '朋友还钱', description: '多年不联系的朋友突然联系你要还钱', icon: '💵', type: 'opportunity', options: [{ text: '收下本金', moneyChange: 10000, description: '借了1万还1万，虽然贬值了但还是收了' }, { text: '收本金+利息', moneyChange: 15000, description: '你算了算利息，朋友给了15000，还算仗义' }, { text: '说不用还了', moneyChange: 0, description: '你大气地说不用还了，朋友请你吃了顿饭' }] },
  { id: 'sp15', title: '意外保险理赔', description: '你之前买的意外险居然赔了', icon: '🏥', type: 'opportunity', options: [{ text: '申请理赔', moneyChange: 100000, description: '住院花了5万，保险赔了10万，还赚了5万' }, { text: '全额理赔', moneyChange: 200000, description: '鉴定为重伤，赔了20万，够养伤了' }, { text: '没买保险', moneyChange: 0, description: '你很后悔，当年怎么没买份保险呢' }] },
  { id: 'sp16', title: '抖音直播打赏', description: '你心血来潮开了场直播', icon: '🎙️', type: 'opportunity', options: [{ text: '认真直播', moneyChange: 100000, description: '你唱歌太好听了，土豪刷了10万' }, { text: 'PK赢了', moneyChange: 50000, description: '直播PK赢了对面，分到5万打赏' }, { text: '直播没人看', moneyChange: 10, description: '你播了2小时，只有3个观众，其中2个是家人' }] },
  { id: 'sp17', title: '卖域名赚钱', description: '你想起当年注册的域名居然值钱了', icon: '🌐', type: 'opportunity', options: [{ text: '挂在网上卖', moneyChange: 50000, description: '有人出5万买了你的域名，真香' }, { text: '大公司求购', moneyChange: 200000, description: '某大公司看中了，开价20万' }, { text: '忘了域名是啥', moneyChange: 0, description: '你翻遍了邮箱也没找到注册记录' }] },
  { id: 'sp18', title: '古董估值暴涨', description: '爷爷留下的花瓶居然是古董', icon: '🏺', type: 'opportunity', options: [{ text: '拍卖行估价', moneyChange: 500000, description: '专家说这是明代官窑，市场价50万' }, { text: '卖给出价最高的', moneyChange: 800000, description: '几个收藏家竞价，最终80万成交' }, { text: '捐给博物馆', moneyChange: 100000, description: '博物馆给了10万奖励和一面锦旗' }] },
  { id: 'sp19', title: '理财分红', description: '你早年投资的项目终于分红了', icon: '💹', type: 'opportunity', options: [{ text: '提取分红', moneyChange: 100000, description: '当年投的10万，现在分红了10万，翻倍了' }, { text: '再投资', moneyChange: 200000, description: '你选择红利再投资，5年后变成20万' }, { text: '早就忘了这事', moneyChange: 5000, description: '你翻出旧存折，发现还有5000块分红' }] },
  { id: 'sp20', title: '卖二手奢侈品', description: '清理衣柜发现好多奢侈品', icon: '👜', type: 'opportunity', options: [{ text: '挂二手平台', moneyChange: 50000, description: '包、表、衣服卖了5万，断舍离真爽' }, { text: '找专业回收', moneyChange: 30000, description: '奢侈品回收店给价3万，虽然低但省心' }, { text: '继续压箱底', moneyChange: 0, description: '这些是回忆，不能卖，留着传家宝' }] },
  // 更多特殊收入事件...
];

// ==================== 特殊支出事件库 (10% - 1000条) ====================

const specialExpenseEvents: GameEvent[] = [
  { id: 'se1', title: '缅北历险记', description: '朋友说带你去缅北赚大钱', icon: '🌏', type: 'risk', options: [{ text: '果断拒绝', moneyChange: 0, description: '你深知天上不会掉馅饼，果断拒绝' }, { text: '去了再说', moneyChange: -1000000, description: '结果被卖了，用100万赎回来了，腰子还在' }, { text: '偷跑回国', moneyChange: -500000, description: '你机智地逃了出来，但花了50万疏通关系' }] },
  { id: 'se2', title: '投资P2P暴雷', description: '朋友推荐了一个超高收益的P2P', icon: '💸', type: 'risk', options: [{ text: '投资10万试试', moneyChange: -100000, description: '一个月后平台跑路，10万打水漂' }, { text: 'all in', moneyChange: -500000, description: '你投了50万all in，血本无归，欲哭无泪' }, { text: '觉得不对劲', moneyChange: 0, description: '你研究了一下，觉得是庞氏骗局，完美避坑' }] },
  { id: 'se3', title: '创业失败', description: '你决定自己当老板', icon: '📋', type: 'risk', options: [{ text: '开个小店', moneyChange: -200000, description: '开了个奶茶店，三个月倒闭，亏了20万' }, { text: '互联网创业', moneyChange: -500000, description: '做了个app，用户没几个，投资人全跑了' }, { text: '还是打工吧', moneyChange: -10000, description: '你花了1万做市场调研，然后决定放弃' }] },
  { id: 'se4', title: '赌博输光', description: '朋友带你去澳门赌场见世面', icon: '🎰', type: 'risk', options: [{ text: '小赌怡情', moneyChange: -50000, description: '玩了两把，输了5万，及时收手' }, { text: '想翻本', moneyChange: -200000, description: '你越输越想翻本，最后输了20万才醒悟' }, { text: '只看不赌', moneyChange: -1000, description: '你说不赌，但请朋友吃喝花了1000' }] },
  { id: 'se5', title: '买期房烂尾', description: '你买了套房，结果成了烂尾楼', icon: '🏗️', type: 'risk', options: [{ text: '继续还房贷', moneyChange: -100000, description: '一边租房一边还贷，白白支出了10万' }, { text: '停止还贷', moneyChange: -200000, description: '银行起诉，你还了20万违约金加本金' }, { text: '提前查了资质', moneyChange: 0, description: '你发现是问题楼盘，选择不买，躲过一劫' }] },
  { id: 'se6', title: '炒股被套', description: '牛市来了，你冲进了股市', icon: '📉', type: 'risk', options: [{ text: '小试牛刀', moneyChange: -50000, description: '你买了10万，现在只剩5万了' }, { text: '相信专家', moneyChange: -100000, description: '专家说会涨，你信了，亏了10万' }, { text: '空仓观望', moneyChange: 0, description: '你看戏看着别人亏钱，暗暗庆幸' }] },
  { id: 'se7', title: '加盟奶茶店', description: '看到某品牌奶茶店很火，决定加盟', icon: '🧋', type: 'risk', options: [{ text: '正规加盟', moneyChange: -300000, description: '加盟费+装修+原料，30万进去了' }, { text: '网红店合作', moneyChange: -500000, description: '交了50万加盟费，结果是山寨品牌' }, { text: '先去考察', moneyChange: -5000, description: '你花钱去考察，发现是坑，及时止损' }] },
  { id: 'se8', title: '借给朋友钱', description: '多年好友开口借钱', icon: '🤝', type: 'risk', options: [{ text: '借5万', moneyChange: -50000, description: '说好一个月还，结果三年了人影都没有' }, { text: '倾囊相助', moneyChange: -200000, description: '你把积蓄都借出去了，现在自己揭不开锅' }, { text: '哭穷拒绝', moneyChange: 0, description: '你说自己都吃不饱，朋友悻悻走了' }] },
  { id: 'se9', title: '收藏品骗局', description: '有人说古董收藏能赚大钱', icon: '🏺', type: 'risk', options: [{ text: '买了几件收藏', moneyChange: -100000, description: '你买了一屋子收藏品，后来发现全是假的' }, { text: '投资大师指导', moneyChange: -300000, description: '大师带你收藏，先交30万学费' }, { text: '不感兴趣', moneyChange: 0, description: '你深知自己不懂行，选择不碰' }] },
  { id: 'se10', title: '直播打赏冲动', description: '你看直播时头脑一热', icon: '🎁', type: 'risk', options: [{ text: '刷了个藏宝图', moneyChange: -50000, description: '手滑了！刷了5万块的藏宝图，心在滴血' }, { text: '和主播处对象', moneyChange: -200000, description: '为了和主播在一起，花了20万，见光死后人财两空' }, { text: '理性看直播', moneyChange: 0, description: '你只看不上头，省了很多钱' }] },
  { id: 'se11', title: '酒驾被抓', description: '喝完酒觉得自己很清醒', icon: '🚗', type: 'risk', options: [{ text: '主动配合', moneyChange: -10000, description: '扣12分罚1万，还被拘留了15天' }, { text: '找人私了', moneyChange: -50000, description: '托关系花了5万，结果还是被查出来了' }, { text: '叫了代驾', moneyChange: -50, description: '花50块叫代驾，虽然心疼但安全到家' }] },
  { id: 'se12', title: '酒局应酬', description: '甲方爸爸来了，必须喝好', icon: '🍺', type: 'risk', options: [{ text: '陪甲方喝', moneyChange: -2000, description: '一顿饭喝了5瓶茅台，花了2000酒钱' }, { text: '喝到胃出血', moneyChange: -50000, description: '喝到吐血，住院花了5万，甲方感动得给你合同' }, { text: '以茶代酒', moneyChange: -500, description: '甲方觉得你诚意不够，合同黄了' }] },
  { id: 'se13', title: '买豪车装门面', description: '为了谈生意，你决定买辆好车', icon: '🚘', type: 'risk', options: [{ text: '贷款买保时捷', moneyChange: -500000, description: '首付50万贷款200万，月供3万，三个月断供' }, { text: '买了二手豪车', moneyChange: -200000, description: '贪便宜买了二手宾利，结果修车花了20万' }, { text: '坐地铁去谈', moneyChange: 0, description: '甲方看你骑共享单车，反而觉得你务实' }] },
  { id: 'se14', title: '医美失败', description: '你决定做个医美改善形象', icon: '💉', type: 'risk', options: [{ text: '玻尿酸填充', moneyChange: -50000, description: '花了5万，效果还不错，但半年就吸收了' }, { text: '做了个全套', moneyChange: -200000, description: '花了20万整成网红脸，现在后悔了' }, { text: '敷面膜省钱', moneyChange: -100, description: '你买了很多面膜，据说也能变美' }] },
  { id: 'se15', title: '电信诈骗', description: '收到一条说你涉嫌洗钱的短信', icon: '📱', type: 'risk', options: [{ text: '按指示操作', moneyChange: -100000, description: '你按他们说的转了10万到安全账户，然后就没有然后了' }, { text: '给验证码', moneyChange: -50000, description: '你给了验证码，卡里的5万被刷走了' }, { text: '报警处理', moneyChange: 0, description: '你报警了，警察叔叔夸你警惕性高' }] },
  { id: 'se16', title: '帮人担保', description: '朋友求你帮他贷款做担保', icon: '✍️', type: 'risk', options: [{ text: '义气担保', moneyChange: -200000, description: '朋友跑路了，你还了20万担保贷款' }, { text: '拒绝担保', moneyChange: 0, description: '你说你也穷，朋友骂你不仗义' }, { text: '只签一半', moneyChange: -100000, description: '你担保了一半，朋友跑了，你还了10万' }] },
  { id: 'se17', title: '追星应援', description: '你粉的爱豆要开演唱会', icon: '🎤', type: 'risk', options: [{ text: '演唱会全套', moneyChange: -5000, description: '前排票价+应援物+酒店，花了5000' }, { text: '追私生行程', moneyChange: -30000, description: '你跟着偶像跑了三个城市，花了3万' }, { text: '在家看直播', moneyChange: -30, description: '你花了30块买直播会员，远远观望' }] },
  { id: 'se18', title: '养宠物开销', description: '你决定养只宠物', icon: '🐱', type: 'risk', options: [{ text: '买品种猫', moneyChange: -20000, description: '买了只布偶花了2万，结果它天天拆家' }, { text: '买狗子', moneyChange: -10000, description: '买了只柯基，疫苗狗粮尿布花了1万' }, { text: '云吸宠物', moneyChange: 0, description: '你去猫咖花了50，吸完就走' }] },
  { id: 'se19', title: '离婚财产分割', description: '婚姻走到尽头', icon: '💔', type: 'risk', options: [{ text: '房子归对方', moneyChange: -3000000, description: '婚后房产归对方，你损失了300万' }, { text: '给抚养费', moneyChange: -500000, description: '孩子归对方，你每月给5000抚养费' }, { text: '和平分手', moneyChange: -100000, description: '你们协议离婚，花10万做了财产公证' }] },
  { id: 'se20', title: '酒托骗局', description: '网上认识个美女约你见面', icon: '🍷', type: 'risk', options: [{ text: '赴约见面', moneyChange: -10000, description: '点了两杯酒花了1万，你才反应过来被酒托了' }, { text: '趁机跑路', moneyChange: -1000, description: '你假装接电话跑了，但被拦下买了单' }, { text: '报警维权', moneyChange: 0, description: '你报警了，警察端掉了一个酒托团伙' }] },
  // 更多特殊支出事件...
];

// ==================== 生成完整10000条事件 ====================

// 生成基础事件池的变体 - 确保生成目标数量
const generateEventVariants = (baseEvents: GameEvent[], targetCount: number): GameEvent[] => {
  const variants: GameEvent[] = [...baseEvents];
  const locations = [
    '三里屯', '国贸', '陆家嘴', '中关村', '望京', '南锣鼓巷', '田子坊', '城隍庙',
    '西湖', '解放碑', '洪崖洞', '宽窄巷子', '春熙路', '观音桥', '王府井', '南京路',
    '外滩', '小寨', '大唐不夜城', '回民街', '五道口', '五棵松', '朝外大街', '建外SOHO',
    '静安寺', '徐家汇', '人民广场', '新天地', '淮海路', '前门大街', '西单', '朝阳大悦城',
    '珠江新城', '天河城', '太古汇', '北京路', '上下九', '春熙路', '太古里', '锦里',
    '武侯祠', '宽窄巷子', '九眼桥', '成都339', '观音桥', '解放碑', '南坪万达', '沙坪坝',
    '龙湖时代', '鄱阳街', '江汉路', '光谷广场', '楚河汉街', '户部巷', '昙华林', '汉正街',
    '河坊街', '南宋御街', '吴山广场', '武林路', '湖滨银泰', '杭州大厦', 'in77', '龙翔桥'
  ];
  const prefixes = [
    '神奇的', '神秘的', '普通的', '倒霉的', '幸运的', '尴尬的', '搞笑的', '离奇的',
    '荒诞的', '离谱的', '魔幻的', '诡异的', '奇葩的', '狗血的', '刺激的', '意外的'
  ];
  const suffixes = [
    '结局很美好', '你没想到', '结果很意外', '故事还没完', '这就是人生', '社会很单纯',
    '命运在捉弄', '天意弄人', '剧情反转了', '事情没那么简单', '你猜到了吗', '出乎意料'
  ];

  let variantIndex = 0;
  while (variants.length < targetCount) {
    for (const baseEvent of baseEvents) {
      if (variants.length >= targetCount) break;
      
      const location = locations[variantIndex % locations.length];
      const prefix = prefixes[(variantIndex / locations.length) % prefixes.length];
      
      // 创建变体事件
      const amountMultiplier = 0.5 + (Math.random() * 3); // 0.5x 到 3.5x
      const moneyBoost = Math.random() > 0.7 ? (Math.random() > 0.5 ? 10 : 0.1) : 1; // 10%概率大额/小额
      
      const newEvent: GameEvent = {
        id: `${baseEvent.id}_gen${variantIndex}`,
        title: `${prefix}${location}${baseEvent.title.replace(/^[\u4e00-\u9fa5]+/, '')}`,
        description: `在${location}${baseEvent.description.slice(2)}，${suffixes[variantIndex % suffixes.length]}~`,
        icon: baseEvent.icon,
        type: baseEvent.type,
        options: baseEvent.options.map((opt) => {
          let changedAmount = Math.round(opt.moneyChange * amountMultiplier * moneyBoost);
          // 确保符号不变
          if (opt.moneyChange < 0 && changedAmount > 0) changedAmount = -changedAmount;
          if (opt.moneyChange > 0 && changedAmount < 0) changedAmount = -changedAmount;
          
          return {
            text: opt.text,
            moneyChange: changedAmount,
            description: opt.description.split('，')[0] + '...'
          };
        })
      };
      
      variants.push(newEvent);
      variantIndex++;
    }
  }
  
  return variants.slice(0, targetCount);
};

// 计算基础事件数量
const baseEventCount = 
  workIncomeEvents.length +
  helpOthersEvents.length +
  dailySurpriseEvents.length +
  dailyConsumptionEvents.length +
  beingScammedEvents.length +
  specialIncomeEvents.length +
  specialExpenseEvents.length;

// 需要额外生成的事件数
const additionalEvents = 10000 - baseEventCount;

// 生成变体数量 (平均分配)
const variantsPerCategory = Math.ceil(additionalEvents / 5); // 5个主要类别平均

// 合并所有事件 - 确保总共10000条
export const gameEvents: GameEvent[] = [
  ...workIncomeEvents,
  ...helpOthersEvents,
  ...dailySurpriseEvents,
  ...dailyConsumptionEvents,
  ...beingScammedEvents,
  ...specialIncomeEvents,
  ...specialExpenseEvents,
  // 生成变体 - 5个主要类别各生成 variantsPerCategory 条
  ...generateEventVariants(workIncomeEvents, workIncomeEvents.length + variantsPerCategory),
  ...generateEventVariants(helpOthersEvents, helpOthersEvents.length + variantsPerCategory),
  ...generateEventVariants(dailySurpriseEvents, dailySurpriseEvents.length + variantsPerCategory),
  ...generateEventVariants(dailyConsumptionEvents, dailyConsumptionEvents.length + variantsPerCategory),
  ...generateEventVariants(beingScammedEvents, beingScammedEvents.length + variantsPerCategory),
  // 特殊事件各生成一半
  ...generateEventVariants(specialIncomeEvents, specialIncomeEvents.length + Math.floor(variantsPerCategory / 2)),
  ...generateEventVariants(specialExpenseEvents, specialExpenseEvents.length + Math.floor(variantsPerCategory / 2)),
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

// 根据权重获取随机事件
export const getWeightedRandomEvent = (): GameEvent => {
  // 40% 收入事件, 40% 支出事件, 10% 特殊收入, 10% 特殊支出
  const roll = Math.random();
  
  if (roll < 0.4) {
    // 收入事件
    const incomeEvents = gameEvents.filter(e => e.type === 'work' || e.type === 'opportunity');
    return incomeEvents[Math.floor(Math.random() * incomeEvents.length)];
  } else if (roll < 0.8) {
    // 支出事件
    const expenseEvents = gameEvents.filter(e => e.type === 'consumption' || e.type === 'risk');
    return expenseEvents[Math.floor(Math.random() * expenseEvents.length)];
  } else if (roll < 0.9) {
    // 特殊收入事件
    const specialIncome = gameEvents.filter(e => e.options.some(o => o.moneyChange > 10000));
    return specialIncome[Math.floor(Math.random() * specialIncome.length)] || specialIncomeEvents[0];
  } else {
    // 特殊支出事件
    const specialExpense = gameEvents.filter(e => e.options.some(o => o.moneyChange < -10000));
    return specialExpense[Math.floor(Math.random() * specialExpense.length)] || specialExpenseEvents[0];
  }
};
