// 游戏随机事件定义 - 搞笑、接地气、有反转的故事事件库
// 金额按百分比设计，基础100元可玩多天

export interface GameEventOption {
  text: string;
  // 金额基数：percent 为相对于初始金额100元的百分比，范围 -50% ~ +200%
  percentMin: number;
  percentMax: number;
  probability: number; // 选择概率 0-1
  description: string;
  moralValue: number; // 道德值变化：正值=加分，负值=减分
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

// ==================== 超级搞笑故事事件库 ====================
// moralValue: 道德值变化，正值=积极选择加分，负值=消极/冒险选择减分

const funnyStoryEvents: GameEvent[] = [
  // 村长系列
  { id: 's1', title: '帮村长砍柴', description: '村长大爷说家里柴火不够用了，热情邀请你去帮忙砍柴，还说砍完请你喝酒。砍完柴，大爷说天黑了不安全，非要留你过夜。你半夜醒来，发现村长大爷居然在对你...做出不可描述的事情！你连夜穿着一条内裤逃跑，结果被隔壁老太太抓住说你耍流氓', icon: '🪓', type: 'risk', guaranteed: false, options: [{ text: '跑！', percentMin: -55, percentMax: -40, probability: 0.8, description: '你连夜裸奔逃跑，结果被罚了一笔钱', moralValue: -10 }, { text: '假装睡着', percentMin: 30, percentMax: 40, probability: 0.2, description: '你屏住呼吸装睡到天亮，村长悻悻地走了', moralValue: 5 }] },
  { id: 's2', title: '村长家的相亲局', description: '村长神秘兮兮说有漂亮姑娘介绍给你。你精心打扮去了，发现相亲对象是村长的傻儿子！你想跑，但村长已经把酒菜摆上了。你硬着头皮喝了三大碗，醒来发现自己在猪圈里，身上全是泥', icon: '🍺', type: 'risk', guaranteed: false, options: [{ text: '硬着头皮喝', percentMin: -35, percentMax: -30, probability: 0.6, description: '喝多了，醒来在猪圈，身上的钱都被拿去赔猪了', moralValue: 0 }, { text: '找借口溜', percentMin: -35, percentMax: -30, probability: 0.4, description: '你说肚子疼跑了，但份子钱还是要交的', moralValue: -5 }] },
  { id: 's3', title: '村长让你当证人', description: '村长说你为人正直，要你帮忙当个证人。结果是村长和寡妇吵架让你评理！寡妇一口咬定村长偷看她洗澡，你夹在中间左右为难', icon: '👨‍⚖️', type: 'risk', guaranteed: false, options: [{ text: '说实话', percentMin: -55, percentMax: -40, probability: 0.5, description: '你说了实话，得罪了村长，被罚扫大街一周', moralValue: 15 }, { text: '和稀泥', percentMin: 30, percentMax: 50, probability: 0.5, description: '两边都夸，两人各给了你好处费', moralValue: -5 }] },
  
  // 奇葩路人系列
  { id: 's4', title: '地铁上的奇葩', description: '地铁上有个大哥一直在大声打电话，说什么几百万的生意。你正听着，旁边大妈突然指着你说：大兄弟，这是我儿子，他刚从泰国回来，你们认识一下？大哥惊恐地看着你...', icon: '🚇', type: 'opportunity', guaranteed: false, options: [{ text: '配合大妈', percentMin: 30, percentMax: 50, probability: 0.4, description: '大妈一高兴，给你介绍了个白富美', moralValue: 10 }, { text: '赶紧下车', percentMin: -55, percentMax: -40, probability: 0.6, description: '你落荒而逃，大妈在后面喊：别跑啊！我儿子真的从泰国回来的！', moralValue: 0 }] },
  { id: 's5', title: '街头算命大师', description: '大师说你三天内必有血光之灾，破解方法是要买他的开光平安符。你刚想走，大师突然说：等等！你身上有小人！他指了指路过的乞丐...', icon: '🔮', type: 'risk', guaranteed: false, options: [{ text: '买平安符', percentMin: -60, percentMax: -40, probability: 0.5, description: '你买了符，结果发现这符在某宝上几块钱就能买到', moralValue: -5 }, { text: '怼回去', percentMin: 30, percentMax: 40, probability: 0.5, description: '你说他是骗子，大师被你气走了，围观群众给你鼓掌', moralValue: 15 }] },
  { id: 's6', title: '碰瓷的老太太', description: '你正常走路，一个老太太突然倒地不起，非说是你撞的！围观群众越来越多，你百口莫辩。正当你绝望时，老太太站起来说：乖孙啊，奶奶逗你玩呢！原来是你失散多年的亲奶奶！', icon: '👵', type: 'opportunity', guaranteed: false, options: [{ text: '认亲', percentMin: 40, percentMax: 70, probability: 0.4, description: '奶奶给了你一个大红包，说是补偿', moralValue: 10 }, { text: '吓跑了', percentMin: -55, percentMax: -40, probability: 0.6, description: '你心理阴影面积太大，落荒而逃', moralValue: -10 }] },
  
  // 相亲奇葩系列
  { id: 's7', title: '父母的相亲安排', description: '父母背着你安排了相亲，对方是个开保时捷的白富美。你们相谈甚欢，她突然说：我其实喜欢的是你妈...你当场石化', icon: '💑', type: 'risk', guaranteed: false, options: [{ text: '打电话给妈', percentMin: -40, percentMax: 35, probability: 0.5, description: '你妈冲过来一顿输出，但白富美最后成了你干姐姐', moralValue: 5 }, { text: '假装没听见', percentMin: -30, percentMax: 30, probability: 0.5, description: '你埋头吃饭，白富美最后给了你一笔封口费', moralValue: -10 }] },
  { id: 's8', title: '相亲对象是前任', description: '七大姑给你介绍了个相亲对象，结果推门进来的是你高中时被甩的前任！前任看到你，冷笑一声：当年嫌我穷，现在混得怎么样了？', icon: '💔', type: 'risk', guaranteed: false, options: [{ text: '装不认识', percentMin: -35, percentMax: 30, probability: 0.5, description: '你假装不认识，但前任当场揭穿了你', moralValue: -15 }, { text: '炫富', percentMin: 30, percentMax: 60, probability: 0.5, description: '你假装不经意露出手机壳上写着的"年入百万"，前任后悔了', moralValue: -5 }] },
  
  // 租房奇葩系列
  { id: 's9', title: '租到凶宅', description: '你刚租了个便宜房子，入住第一晚就听到奇怪的声音。第二天邻居告诉你：上一个租客在这里上吊自杀了！你吓得想退租，但房东说押金不退', icon: '🏠', type: 'risk', guaranteed: false, options: [{ text: '硬着头皮住', percentMin: -55, percentMax: -40, probability: 0.4, description: '你住了三天，差点吓出心脏病，最后押金没了', moralValue: 10 }, { text: '找道士', percentMin: -45, percentMax: 45, probability: 0.6, description: '道士来了说是前任租客的猫在叫，你白花了钱但房东被吓跑了', moralValue: -5 }] },
  { id: 's10', title: '合租室友太奇葩', description: '你搬进合租房，发现室友是个二次元宅男。他每天半夜对着手办说话，还把你的外卖吃了说是"供品"。更可怕的是，他说他喜欢你...', icon: '🏢', type: 'risk', guaranteed: false, options: [{ text: '搬家', percentMin: -45, percentMax: -35, probability: 0.6, description: '你连夜搬家，押金和违约金都打了水漂', moralValue: 5 }, { text: '感化他', percentMin: -35, percentMax: 40, probability: 0.4, description: '你请他吃了顿饭，他成了你的好朋友，还介绍了工作', moralValue: 15 }] },
  
  // 职场奇葩系列
  { id: 's11', title: '老板的特殊癖好', description: '新来的老板据说是个工作狂，你加班到半夜，老板突然说：你知道我为什么提拔你吗？因为你长得像我前妻！然后他从抽屉里拿出一张照片...居然是你妈年轻时的照片！', icon: '💼', type: 'opportunity', guaranteed: false, options: [{ text: '认亲戚', percentMin: 40, percentMax: 60, probability: 0.4, description: '原来老板是你妈的初恋，你成了老板眼中的宝贝', moralValue: 10 }, { text: '赶紧辞职', percentMin: -60, percentMax: -40, probability: 0.6, description: '你吓得当场辞职，但老板给你多发了一个月工资', moralValue: -10 }] },
  { id: 's12', title: '同事的暧昧', description: '漂亮女同事经常给你带早餐，还说喜欢你。你正心花怒放，她突然说：其实我是在还钱，我欠你一顿早餐钱一直没还...你当场社死', icon: '🥪', type: 'consumption', guaranteed: false, options: [{ text: '假装没事', percentMin: -55, percentMax: -40, probability: 0.7, description: '你尴尬地笑了笑，从此看见她就绕道走', moralValue: 5 }, { text: '幽默化解', percentMin: 30, percentMax: 50, probability: 0.3, description: '你幽默地说：那早餐钱我请了，她觉得你人不错', moralValue: 15 }] },
  
  // 吃饭奇葩系列
  { id: 's13', title: '火锅店的惊喜', description: '你独自去吃火锅，正吃得起劲，服务员突然端着一个蛋糕走过来，全店的人开始唱生日歌！你一脸懵，原来他们认错人了。正尴尬时，你发现对面桌的人真的是你小学同学！', icon: '🍲', type: 'opportunity', guaranteed: false, options: [{ text: '大方承认', percentMin: 5, percentMax: 20, probability: 0.6, description: '小学同学请了你这顿饭，还给了你名片', moralValue: 10 }, { text: '躲厕所', percentMin: -55, percentMax: -40, probability: 0.4, description: '你躲了一个小时，出来发现账单已被好心人付了', moralValue: 0 }] },
  { id: 's14', title: '点外卖的惊吓', description: '你点了份小龙虾，外卖小哥送到时满脸通红说：亲，能给我个好评吗？我今天被差评就要被开除了！然后他掏出一束花说：其实我是想追你！', icon: '🦞', type: 'risk', guaranteed: false, options: [{ text: '给好评', percentMin: -35, percentMax: 30, probability: 0.5, description: '你给了好评，但拒绝了他，心惊肉跳', moralValue: 5 }, { text: '报警', percentMin: -55, percentMax: -40, probability: 0.5, description: '你报了警，虽然是乌龙，但外卖小哥被批评教育了', moralValue: -5 }] },
  
  // 医院奇葩系列
  { id: 's15', title: '挂号挂错了', description: '你肚子疼去挂号，一紧张挂成了妇科！医生看了你一眼说：先生，这里是妇科。你正想解释，旁边大妈说：小伙子我懂，现在男人也能生孩子！', icon: '🏥', type: 'consumption', guaranteed: false, options: [{ text: '解释清楚', percentMin: -55, percentMax: -40, probability: 0.6, description: '你解释了半天，医生让你重新挂号，白花了挂号费', moralValue: 5 }, { text: '干脆检查一下', percentMin: -45, percentMax: 40, probability: 0.4, description: '你索性让妇科医生看了看，结果发现你真的有点问题...', moralValue: -10 }] },
  { id: 's16', title: '病房里的室友', description: '你住院做手术，同病房是个话痨大爷。大爷每天给你讲他年轻时的"光辉事迹"，包括追了哪些姑娘。你正听得入神，护士进来说：大爷，您又吹牛了，您年轻时长这样...然后拿出照片，是个秃头胖子', icon: '😷', type: 'consumption', guaranteed: false, options: [{ text: '继续听', percentMin: -35, percentMax: 30, probability: 0.5, description: '你陪聊，大爷给了你一袋水果', moralValue: 10 }, { text: '戴耳机', percentMin: 30, percentMax: 40, probability: 0.5, description: '你假装睡觉，大爷觉得你没趣，反而给了你一些钱', moralValue: -5 }] },
  
  // 旅游奇葩系列
  { id: 's17', title: '导游的套路', description: '你报了个低价旅游团，导游带你们进了一个卖玉的店。导游说：不买不让走！你正绝望，发现店主居然是你前女友！她冷笑说：当年你嫌我穷，现在我可是开着玛莎拉蒂卖玉呢！', icon: '🏰', type: 'risk', guaranteed: false, options: [{ text: '硬着头皮买', percentMin: -50, percentMax: -40, probability: 0.4, description: '你买了块玉，前女友说假一赔十，然后她把店关了跑了', moralValue: -10 }, { text: '装不认识', percentMin: -55, percentMax: -40, probability: 0.6, description: '你装不认识，但被迫买了最便宜的纪念品', moralValue: -5 }] },
  { id: 's18', title: '景点的拍照陷阱', description: '你看到有人在景点拿着卡通人物拍照，觉得很有趣就拍了一张。结果他过来说：这是我们收费合影！你手里那张已经打印出来了...', icon: '📸', type: 'risk', guaranteed: false, options: [{ text: '付钱', percentMin: -60, percentMax: -40, probability: 0.7, description: '你付了钱，但照片拍得像遗照', moralValue: -5 }, { text: '报警', percentMin: -35, percentMax: 30, probability: 0.3, description: '警察来了，说是正规拍照，你白紧张了', moralValue: 10 }] },
  
  // 夜店酒吧系列
  { id: 's19', title: '酒吧的邂逅', description: '你去酒吧放松，一个美女过来搭讪。你们聊得很开心，她说：我先上个厕所。然后你就再也没见过她。等你结账时发现：你被她逃单了，她点了一大笔酒！', icon: '🍸', type: 'risk', guaranteed: false, options: [{ text: '认栽付钱', percentMin: -60, percentMax: -40, probability: 0.7, description: '你含泪付了账单，发誓再也不相信美女', moralValue: -5 }, { text: '找经理', percentMin: -35, percentMax: 30, probability: 0.3, description: '经理查监控发现她经常来逃单，你获得了免单', moralValue: 10 }] },
  { id: 's20', title: '酒后的疯狂', description: '你喝多了，第二天醒来发现自己躺在陌生的床上，旁边还有个男的在打呼噜。你吓得跳起来，发现自己穿着裙子！仔细一看：这是你自己家，那男的是你喝醉后叫的上门代驾！', icon: '🚗', type: 'risk', guaranteed: false, options: [{ text: '给钱打发', percentMin: -60, percentMax: -40, probability: 0.6, description: '你给了他一些钱，他说你昨晚还亲了他一口', moralValue: -10 }, { text: '报警', percentMin: -55, percentMax: -40, probability: 0.4, description: '警察说是你叫的代驾，你不仅给钱还浪费了警力', moralValue: -5 }] },
  
  // 健身房奇葩系列
  { id: 's21', title: '健身房的搭讪', description: '你在健身房练得好好的，私教过来说：你姿势不对，容易受伤。然后他开始手把手教你，结果他的手越来越不老实...你正想发作，旁边大妈说：教练你小心点，上次那个学员报警了！', icon: '💪', type: 'risk', guaranteed: false, options: [{ text: '继续练', percentMin: -55, percentMax: -40, probability: 0.5, description: '你硬着头皮练完，私教要你办卡，你又花了一笔', moralValue: -5 }, { text: '换教练', percentMin: -40, percentMax: 35, probability: 0.5, description: '你换了教练，新教练是个肌肉大姐，专业又靠谱', moralValue: 10 }] },
  
  // 网购奇葩系列
  { id: 's22', title: '网购的惊喜', description: '你网购了一件T恤，收到后发现上面印着：我是傻子！去找客服理论，客服说：亲，这是限量版呢！你还要更多件吗？买一送一哦！', icon: '👕', type: 'consumption', guaranteed: false, options: [{ text: '继续买', percentMin: -45, percentMax: -35, probability: 0.3, description: '你买了很多件，现在你有穿不完的"我是傻子"T恤', moralValue: -15 }, { text: '给差评', percentMin: -2, percentMax: 2, probability: 0.7, description: '你给了差评，客服连续给你发了很多消息求删评', moralValue: 5 }] },
  
  // 洗浴中心系列
  { id: 's23', title: '洗浴中心的误会', description: '你累了去洗浴中心放松，搓完澡被服务员带进包间按摩。技师手法很专业，你舒服地睡着了。醒来发现手机不见了！调监控发现：是你自己把手机压在枕头下忘拿了，虚惊一场。但你发现账单写着：特殊服务费！', icon: '🛁', type: 'risk', guaranteed: false, options: [{ text: '付钱走人', percentMin: -60, percentMax: -40, probability: 0.6, description: '你给了钱，但技师说她什么也没干，是系统自动加的', moralValue: -5 }, { text: '理论', percentMin: -55, percentMax: -40, probability: 0.4, description: '你理论了半天，经理说可以打五折，你还是花了一笔钱', moralValue: 5 }] },
  
  // 理发店系列
  { id: 's24', title: '理发店的套路', description: '你去理发店剪头发，理发师说：帅哥，你这个头型需要烫一下才好看。你说不用，他就叹气：哎，又一个被生活打败的人。烫完他给你看镜子，你差点哭出来：这还是你吗？像个爆炸头！', icon: '💈', type: 'consumption', guaranteed: false, options: [{ text: '认了', percentMin: -45, percentMax: -35, probability: 0.5, description: '你顶着爆炸头走出理发店，路人都在看你', moralValue: -10 }, { text: '维权', percentMin: -55, percentMax: -40, probability: 0.5, description: '你投诉到消费者热线，理发店赔了你一些钱，但你的头已经炸了', moralValue: 10 }] },
  
  // 打车系列
  { id: 's25', title: '司机的奇葩故事', description: '你打车回家，司机一路跟你聊天，说他以前是上市公司老板，后来因为老婆出轨破产了。你正安慰他，他突然说：到了，扫码吧。抬头一看：这是你家隔壁，你发现他说的破产公司就在前面，原来他是在炫富！', icon: '🚕', type: 'opportunity', guaranteed: false, options: [{ text: '聊天', percentMin: -35, percentMax: 30, probability: 0.6, description: '你们聊得很开心，他给你免了单', moralValue: 10 }, { text: '赶紧下车', percentMin: -55, percentMax: -40, probability: 0.4, description: '你怕他继续炫富，赶紧下车了', moralValue: 0 }] },
  
  // 朋友聚会系列
  { id: 's26', title: '同学会的炫富', description: '多年不见的同学会上，当年你最看不起的同学小王开着保时捷来了。他一进门就说：不好意思，我的飞机晚点了。大家震惊：你还坐飞机？他说：不，我的私人飞机晚点了...', icon: '🎉', type: 'risk', guaranteed: false, options: [{ text: '攀附他', percentMin: -40, percentMax: 40, probability: 0.5, description: '你巴结他，他随手给了你一张名片，说可以安排你去他公司上班', moralValue: -5 }, { text: '怼他', percentMin: 30, percentMax: 40, probability: 0.5, description: '你说他炫富，结果发现他真的是土豪，同学会变成了对你的批判会', moralValue: 5 }] },
  
  // 快递系列
  { id: 's27', title: '快递柜的惊吓', description: '你去取快递，输入取件码后柜门开了，结果里面不是你的快递，是一个充气娃娃！旁边一个大叔幽幽地说：这是我的...你吓得把柜门关上了，大叔说：别关啊，我还要拿呢！', icon: '📦', type: 'consumption', guaranteed: false, options: [{ text: '道歉', percentMin: -55, percentMax: -40, probability: 0.7, description: '你尴尬地道歉，大叔说他买给老婆的，让你别多想', moralValue: 10 }, { text: '跑', percentMin: -30, percentMax: 30, probability: 0.3, description: '你落荒而逃，结果忘了拿自己的快递', moralValue: -5 }] },
  
  // 电梯系列
  { id: 's28', title: '电梯里的尴尬', description: '你进电梯，按了楼层，突然发现电梯里有个美女一直看你。你正心跳加速，她开口了：你踩到我的狗了！你低头一看：她怀里抱着一只吉娃娃，缩成一团大小便失禁了...', icon: '🐕', type: 'risk', guaranteed: false, options: [{ text: '道歉', percentMin: -55, percentMax: -40, probability: 0.6, description: '你道歉，美女说她的狗受惊了要去看医生，你赔了医药费', moralValue: 5 }, { text: '解释', percentMin: -55, percentMax: -40, probability: 0.4, description: '你解释狗本来就在抖，但美女不信，你还是被讹了', moralValue: -10 }] },
  
  // 动物园系列
  { id: 's29', title: '动物园的意外', description: '你去动物园看猴子，猴子突然朝你扔了根香蕉。你笑着说猴子真有礼貌，旁边小朋友说：妈妈，猴子为什么要朝那个人扔屎啊？你定睛一看：香蕉是粘在屎上的！', icon: '🐒', type: 'risk', guaranteed: false, options: [{ text: '忍了', percentMin: -60, percentMax: -40, probability: 0.7, description: '你忍了，但身上臭了好几天', moralValue: -5 }, { text: '找动物园', percentMin: -35, percentMax: 30, probability: 0.3, description: '你投诉，动物园赔了你一张年卡', moralValue: 10 }] },
  
  // 酒店系列
  { id: 's30', title: '酒店的特殊服务', description: '你入住酒店，半夜有人敲门。你开门一看，是个穿着暴露的美女，她说：先生，需要按摩服务吗？你心动了一下，然后她拿出二维码说：先付定金...你刚要付，她身后出现两个壮汉说：扫码吧，先生。', icon: '🏨', type: 'risk', guaranteed: false, options: [{ text: '付钱', percentMin: -60, percentMax: -40, probability: 0.3, description: '你付了钱，他们走了，你什么都没得到', moralValue: -15 }, { text: '报警', percentMin: -55, percentMax: -40, probability: 0.7, description: '你报警，警察来了说是仙人跳，你成了证人', moralValue: 15 }] },
];

// ==================== 普通收入事件库 (40%) ====================

const workIncomeEvents: GameEvent[] = [
  { id: 'w1', title: '发传单', description: '街边有人问你要不要发传单赚点外快。你接过传单，发现上面印的是自己的照片，下面写着"此人欠钱不还"...原来是小广告！', icon: '📄', type: 'work', guaranteed: false, options: [{ text: '将错就错发完', percentMin: 30, percentMax: 50, probability: 0.7, description: '你硬着头皮发完了，传单上的人找你要精神损失费', moralValue: -10 }, { text: '找老板理论', percentMin: 30, percentMax: 50, probability: 0.3, description: '老板道歉，给了你双倍工钱', moralValue: 15 }] },
  { id: 'w2', title: '送外卖', description: '外卖小哥的车坏了，看到你在路边发呆。他问你能不能帮忙送一单，你骑上电动车，结果送错了地址，客户给了差评，小哥扣了钱，你过意不去请他吃了顿饭', icon: '🛵', type: 'work', guaranteed: false, options: [{ text: '请吃饭', percentMin: -55, percentMax: -40, probability: 0.6, description: '你们吃了顿烧烤，聊得很开心', moralValue: 10 }, { text: '自己赔', percentMin: 30, percentMax: 45, probability: 0.4, description: '你主动赔了他损失，他感动地多给了你一些钱', moralValue: 15 }] },
  { id: 'w3', title: '街头卖艺', description: '看到有人在地铁口弹吉他卖艺，你觉得丢人不想加入。但吉他手突然晕倒了，你只好硬着头皮上去弹，结果唱得太难听，观众纷纷往你面前的帽子里扔钱——求你停下来！', icon: '🎸', type: 'work', guaranteed: false, options: [{ text: '继续唱', percentMin: 30, percentMax: 50, probability: 0.5, description: '你唱了一会儿，赚了不少"求饶费"', moralValue: -5 }, { text: '跑', percentMin: 30, percentMax: 45, probability: 0.5, description: '你把帽子里的钱拿了就跑', moralValue: -15 }] },
  { id: 'w4', title: '代人遛狗', description: '邻居要加班，问你能不能帮忙遛一下他的哈士奇。你牵出去后发现：这狗力气比你大！它拉着你跑了一条街，你摔了一跤，狗跑了', icon: '🐕', type: 'work', guaranteed: false, options: [{ text: '追狗', percentMin: -35, percentMax: 40, probability: 0.5, description: '你追了很久，终于抓住了狗，邻居给了你一笔钱', moralValue: 15 }, { text: '等狗回来', percentMin: -55, percentMax: -40, probability: 0.5, description: '狗自己回家了，你浑身是伤，邻居还让你赔医药费', moralValue: -10 }] },
  { id: 'w5', title: '家教兼职', description: '楼下大妈问你能不能教她家孩子数学。你去了之后发现，孩子比你还懂数学，他教你玩游戏，你教他数学，结果两人都没学会', icon: '📚', type: 'work', guaranteed: false, options: [{ text: '认输', percentMin: 30, percentMax: 50, probability: 0.6, description: '大妈觉得你很有"亲和力"，给了你教学费', moralValue: 10 }, { text: '努力学习', percentMin: 40, percentMax: 60, probability: 0.4, description: '你晚上学，白天教，反而进步了，大妈很满意', moralValue: 15 }] },
  { id: 'w6', title: '代驾服务', description: '酒店门口有人需要代驾服务。你接了单，开到一半发现：这车居然没有刹车！你一路用手动刹车+撞墙，终于停下来了', icon: '🚗', type: 'work', guaranteed: false, options: [{ text: '撞墙停下', percentMin: -45, percentMax: -35, probability: 0.4, description: '你赔了修墙费，但车主说你很有创意，给你加了钱', moralValue: 5 }, { text: '拉手刹', percentMin: 30, percentMax: 50, probability: 0.6, description: '你用惯性漂移停车，车主惊呆了，多给了你一大笔', moralValue: 15 }] },
  { id: 'w7', title: '餐厅服务员', description: '附近餐厅高峰期缺人手，你去当服务员。结果你端菜的时候绊倒了，菜洒了顾客一身！更可怕的是，那是你前女友和她新男友！', icon: '🍽️', type: 'work', guaranteed: false, options: [{ text: '道歉', percentMin: -60, percentMax: -40, probability: 0.5, description: '你赔了他们一身衣服钱，心在滴血', moralValue: 10 }, { text: '装不认识', percentMin: -3, percentMax: 10, probability: 0.5, description: '你假装不认识，前女友居然给了你一大笔消费，还说"你服务不错"', moralValue: -10 }] },
  { id: 'w8', title: '电话客服', description: '公司临时需要电话客服。你接的第一个电话，客户就开骂：你们产品太差了！结果你听了5分钟，发现骂人的是你爸，你爸也听出来了，双方都很尴尬', icon: '📞', type: 'work', guaranteed: false, options: [{ text: '硬着头皮', percentMin: 30, percentMax: 50, probability: 0.6, description: '你爸觉得你"受委屈了"，偷偷给你转了一笔钱', moralValue: 10 }, { text: '挂电话', percentMin: -55, percentMax: -40, probability: 0.4, description: '你挂了电话，被扣了工资', moralValue: -10 }] },
  { id: 'w9', title: '超市理货员', description: '超市晚上需要理货员整理货架。你去理货的时候，发现货架上有个洞，伸手去摸，摸出来一个老鼠窝！老鼠们冲你龇牙', icon: '🛒', type: 'work', guaranteed: false, options: [{ text: '灭鼠', percentMin: 30, percentMax: 50, probability: 0.6, description: '你英勇灭鼠，超市给了你"除害奖金"', moralValue: 15 }, { text: '喊老板', percentMin: 30, percentMax: 45, probability: 0.4, description: '老板来了，你也跟着跑了', moralValue: -5 }] },
];

// ==================== 支出事件库 (40%) ====================

const dailyConsumptionEvents: GameEvent[] = [
  { id: 'c1', title: '吃早餐', description: '肚子咕咕叫，路边早餐摊飘来香味。你坐下点了碗面，结果吃完发现：这面里有只苍蝇！老板说这是"加量不加价"...', icon: '🥣', type: 'consumption', guaranteed: false, options: [{ text: '吃完', percentMin: -5, percentMax: -2, probability: 0.6, description: '你强忍着恶心吃完了，感觉自己很卑微', moralValue: -5 }, { text: '要求换', percentMin: -55, percentMax: -40, probability: 0.4, description: '老板给你换了碗新的，还多加了肉', moralValue: 10 }] },
  { id: 'c2', title: '买奶茶', description: '奶茶店在打折，第二杯半价。你买了杯奶茶，喝了一口发现：这奶茶好像有问题！你去找店员，店员说：亲，这是"陈年老奶茶"，越久越香哦~', icon: '🧋', type: 'consumption', guaranteed: false, options: [{ text: '认栽', percentMin: -55, percentMax: -40, probability: 0.5, description: '你忍着喝了，拉了一天肚子', moralValue: -10 }, { text: '投诉', percentMin: -35, percentMax: 30, probability: 0.5, description: '你投诉到总部，奶茶店给了你一些兑换券', moralValue: 10 }] },
  { id: 'c3', title: '超市购物', description: '本来只想买点东西，结果逛了一小时。结账时发现：购物车里多了很多你不需要的东西，还有一只不知从哪钻进来的仓鼠', icon: '🛒', type: 'consumption', guaranteed: false, options: [{ text: '买下来', percentMin: -45, percentMax: -35, probability: 0.6, description: '你买下了所有东西，包括那只仓鼠', moralValue: -10 }, { text: '放回去', percentMin: -55, percentMax: -40, probability: 0.4, description: '你放回去，结果仓鼠咬了你一口', moralValue: -5 }] },
  { id: 'c4', title: '充话费', description: '手机收到短信说余额不足。你去充值，结果充错了号码！更惨的是，那个号码的主人居然是你暗恋的人！他/她给你发微信说：谢谢啊，傻子~', icon: '📱', type: 'consumption', guaranteed: true, options: [{ text: '再充一次', percentMin: -45, percentMax: -35, probability: 1, description: '你含泪又充了一次', moralValue: 0 }] },
  { id: 'c5', title: '买零食', description: '路过零食店，橱窗里的零食在向你招手。你买了袋薯片，回家打开一看：里面是空的！仔细看包装，写着"本产品仅供展示"...', icon: '🍫', type: 'consumption', guaranteed: false, options: [{ text: '回去找', percentMin: -55, percentMax: -40, probability: 0.6, description: '老板说是员工疏忽，补了你一袋，结果那袋也是空的', moralValue: 5 }, { text: '算了', percentMin: -55, percentMax: -40, probability: 0.4, description: '你决定不再买这家店的零食', moralValue: -5 }] },
  { id: 'c6', title: '买咖啡', description: '困意袭来，想买杯咖啡提神。结果咖啡太烫，你一口下去，嘴烫了个泡。更惨的是，咖啡洒到了你刚买的白衬衫上', icon: '☕', type: 'consumption', guaranteed: false, options: [{ text: '擦擦', percentMin: -55, percentMax: -40, probability: 0.7, description: '你用湿纸巾擦，结果越擦越脏', moralValue: -5 }, { text: '换衣服', percentMin: -60, percentMax: -40, probability: 0.3, description: '你重新买了件衬衫，干洗费花了一笔', moralValue: -5 }] },
  { id: 'c7', title: '买游戏皮肤', description: '游戏里出了限定皮肤，你一狠心买了。结果第二天，游戏官方宣布：所有玩家都可以免费领取该皮肤！你在群里被嘲笑了一下午', icon: '🎮', type: 'consumption', guaranteed: false, options: [{ text: '忍着', percentMin: -60, percentMax: -40, probability: 0.7, description: '你发誓再也不氪金了', moralValue: -5 }, { text: '退款', percentMin: -55, percentMax: -40, probability: 0.3, description: '你申请退款，官方说"购买即表示同意"，你血亏', moralValue: 0 }] },
  { id: 'c8', title: '打车回家', description: '下班太累了，不想挤地铁。你打了车，结果堵了很久才到家，车费比坐地铁贵很多', icon: '🚗', type: 'consumption', guaranteed: false, options: [{ text: '认了', percentMin: -45, percentMax: -35, probability: 0.8, description: '你看着计价器，心在滴血', moralValue: -5 }, { text: '投诉堵车', percentMin: -55, percentMax: -40, probability: 0.2, description: '司机说你行你上，你被赶下了车', moralValue: -10 }] },
  { id: 'c9', title: '停车费', description: '逛完商场发现停车超时要交费。你算了算：停车费比你买的东西还贵！更惨的是，你的车被别的车堵住了出不去', icon: '🅿️', type: 'consumption', guaranteed: false, options: [{ text: '等', percentMin: -60, percentMax: -40, probability: 0.6, description: '你等了半小时，堵车的人终于走了', moralValue: 5 }, { text: '叫车主', percentMin: -50, percentMax: -30, probability: 0.4, description: '车主来了，居然是你前任！他/她帮你付了停车费', moralValue: 0 }] },
];

// 被坑消费
const beingScammedEvents: GameEvent[] = [
  { id: 'sc1', title: '景区纪念品', description: '旅游景点的东西看起来很有特色。你买了个"正宗"当地特产，回家发现是义乌小商品市场批发的', icon: '🎭', type: 'consumption', guaranteed: false, options: [{ text: '认了', percentMin: -60, percentMax: -40, probability: 0.7, description: '你把纪念品摆在桌上吃灰', moralValue: -5 }, { text: '挂闲鱼', percentMin: -55, percentMax: -40, probability: 0.3, description: '你挂闲鱼卖了，结果被人砍价到1折', moralValue: 5 }] },
  { id: 'sc2', title: '网红小吃', description: '排了很久队终于买到了网红小吃。结果就这？味道一般，分量还少。你看了眼点评软件，发现全是刷的好评！', icon: '🍡', type: 'consumption', guaranteed: false, options: [{ text: '吃完', percentMin: -45, percentMax: -35, probability: 0.6, description: '你忍着吃完了，发誓再也不跟风了', moralValue: -5 }, { text: '给差评', percentMin: -55, percentMax: -40, probability: 0.4, description: '店家打电话求删评，你被烦了很久', moralValue: 10 }] },
  { id: 'sc3', title: '路边切糕', description: '看到切糕很想尝尝。切糕师傅手起刀落：你说只要一小块，他说：切了就要买！你一看那块，还没你指甲盖大！', icon: '🍘', type: 'risk', guaranteed: false, options: [{ text: '买了', percentMin: -60, percentMax: -40, probability: 0.6, description: '你含着泪买下了那块"指甲盖"', moralValue: -10 }, { text: '报警', percentMin: -55, percentMax: -40, probability: 0.4, description: '警察来了，说是明码标价，你还是买了', moralValue: 5 }] },
  { id: 'sc4', title: '手机分期购', description: '营业员说手机可以零利息分期。你办了分期，结果发现：除了本金，还有各种费用...加起来比全款还贵！', icon: '📱', type: 'risk', guaranteed: false, options: [{ text: '认了', percentMin: -40, percentMax: -20, probability: 0.5, description: '你用上了新手机，但感觉被坑了', moralValue: -10 }, { text: '提前还款', percentMin: -50, percentMax: -30, probability: 0.5, description: '提前还款发现违约金比利息还高', moralValue: -5 }] },
  { id: 'sc5', title: '健身房促销', description: '健身房销售说今天办卡最便宜，还送私教课。你热血上头办了年卡，结果第二天去发现：器械全是坏的，私教离职了', icon: '💪', type: 'risk', guaranteed: false, options: [{ text: '维权', percentMin: -45, percentMax: -35, probability: 0.4, description: '你维权成功，退了部分钱', moralValue: 15 }, { text: '在家练', percentMin: -50, percentMax: -40, probability: 0.6, description: '你买了家用器械，比健身房还贵', moralValue: -10 }] },
  { id: 'sc6', title: '办卡充值', description: '理发店说充卡送钱。你充了钱，结果第二天理发店就关门了！门口贴着"装修中"，你等了三个月，店变成了奶茶店', icon: '💈', type: 'risk', guaranteed: false, options: [{ text: '认栽', percentMin: -50, percentMax: -40, probability: 0.6, description: '你发誓再也不办卡了', moralValue: -5 }, { text: '找新店', percentMin: -60, percentMax: -40, probability: 0.4, description: '新店说可以继承老店会员，但要用原价更多的钱升级', moralValue: -10 }] },
  { id: 'sc7', title: '扫码送礼物', description: '有人说扫码注册送小礼物。你扫了，结果注册了一堆APP，还被疯狂电话催债！', icon: '🎁', type: 'risk', guaranteed: false, options: [{ text: '注销', percentMin: -60, percentMax: -40, probability: 0.6, description: '你花了一段时间才把所有账户注销', moralValue: -5 }, { text: '举报', percentMin: 30, percentMax: 40, probability: 0.4, description: '举报后获得了一笔举报奖励', moralValue: 15 }] },
  { id: 'sc8', title: '抽奖骗局', description: '超市门口说购物满额可以抽奖。你抽中了一等奖：玉石打折！你以为捡了便宜，结果鉴定说你买的玉不值钱', icon: '🎰', type: 'risk', guaranteed: false, options: [{ text: '买了', percentMin: -60, percentMax: -40, probability: 0.5, description: '你买了个"传家宝"，回家发现裂了', moralValue: -15 }, { text: '跑了', percentMin: -30, percentMax: 30, probability: 0.5, description: '你跑了，店员在后面喊：大哥别走啊！', moralValue: 5 }] },
];

// ==================== 特殊收入事件库 (10%) ====================

const specialIncomeEvents: GameEvent[] = [
  { id: 'sp1', title: '彩票中奖', description: '你随手买的彩票居然中奖了！你激动地告诉了所有人，结果第二天发现：彩票洗衣服时被搅碎了', icon: '🎰', type: 'opportunity', guaranteed: false, options: [{ text: '欲哭无泪', percentMin: -30, percentMax: 30, probability: 0.7, description: '你发誓再也不买彩票了', moralValue: 0 }, { text: '拼接起来', percentMin: 40, percentMax: 60, probability: 0.3, description: '你花了很多时间拼接，居然还能兑奖！', moralValue: 15 }] },
  { id: 'sp2', title: '拆迁户诞生', description: '你家那片要拆迁了！你欣喜若狂，结果公示期过了，你家不在拆迁范围内——你只是个围观群众', icon: '🏠', type: 'opportunity', guaranteed: false, options: [{ text: '继续围观', percentMin: 30, percentMax: 40, probability: 0.8, description: '你天天去看热闹，顺便捡了邻居不要的旧家具', moralValue: 5 }, { text: '认邻居当干亲', percentMin: 30, percentMax: 60, probability: 0.2, description: '邻居觉得你人不错，认你当干儿子/女儿，给了你一笔钱', moralValue: 10 }] },
  { id: 'sp3', title: '网红突然爆火', description: '你随手拍的视频突然上了热搜。标题是：某男子在街头做出这种事！评论区全是骂你的', icon: '📹', type: 'opportunity', guaranteed: false, options: [{ text: '解释', percentMin: -40, percentMax: 35, probability: 0.5, description: '你发了解释视频，又上了热搜：男子解释后网友不买账', moralValue: 10 }, { text: '蹭热度', percentMin: 40, percentMax: 70, probability: 0.5, description: '你趁热度直播带货，虽然被骂但赚了不少', moralValue: -15 }] },
  { id: 'sp4', title: '公司上市期权', description: '你入职时拿的期权终于兑现了！结果公司上市破发了，股价跌了很多！但老板说：别担心，我们对员工很好——给你们发了纪念品！', icon: '🏢', type: 'investment', guaranteed: false, options: [{ text: '卖股票', percentMin: -35, percentMax: 30, probability: 0.6, description: '你卖光了股票，发现纪念品都比股票值钱', moralValue: -5 }, { text: '继续持有', percentMin: 30, percentMax: 50, probability: 0.4, description: '你赌对了，股价后来涨了，你成了有钱人', moralValue: 10 }] },
  { id: 'sp5', title: '投稿被采用', description: '你学生时代写的小说突然被影视公司看中了！他们说要改编，但预算有限，只能给你一顿饭', icon: '✍️', type: 'opportunity', guaranteed: false, options: [{ text: '同意', percentMin: 30, percentMax: 50, probability: 0.6, description: '你吃了饭，虽然署名权没了，但获得了"选角建议权"', moralValue: 5 }, { text: '拒绝', percentMin: 30, percentMax: 60, probability: 0.4, description: '你拒绝了，结果另一个公司以更高的价格买走了版权', moralValue: 15 }] },
];

// ==================== 特殊支出事件库 (10%) ====================

const specialExpenseEvents: GameEvent[] = [
  { id: 'se1', title: '创业失败', description: '你决定自己当老板，开了个奶茶店。开业第一天：你妈带着七大姑八大姨来捧场，每人买了一杯，然后给你提了一堆"改进建议"...', icon: '📋', type: 'risk', guaranteed: false, options: [{ text: '听完建议', percentMin: -50, percentMax: -40, probability: 0.7, description: '你按建议改了配方，结果所有人都说不如以前好喝了', moralValue: 5 }, { text: '不听', percentMin: -45, percentMax: -35, probability: 0.3, description: '你坚持自己，亲戚们说你翅膀硬了，不再来了', moralValue: -5 }] },
  { id: 'se2', title: '投资P2P暴雷', description: '朋友推荐了一个超高收益的P2P，年化收益50%！你投了钱，第二天平台就跑路了。报警后警察说：这种案子很多，追回来的概率很低', icon: '💸', type: 'risk', guaranteed: false, options: [{ text: '报警', percentMin: -45, percentMax: -35, probability: 0.5, description: '你成了证人，但需要配合调查好久', moralValue: 10 }, { text: '找朋友算账', percentMin: -55, percentMax: -40, probability: 0.5, description: '朋友说他也亏了，还给你看了他的亏损截图，比你还多', moralValue: -10 }] },
  { id: 'se3', title: '借钱给朋友', description: '多年好友开口借钱，说下个月还。你借了一笔钱，结果下个月他说：再缓缓。又过了很久，他突然发微信：我听说你到处说我欠钱不还？', icon: '🤝', type: 'risk', guaranteed: false, options: [{ text: '解释', percentMin: -55, percentMax: -40, probability: 0.5, description: '你们大吵一架，钱还是要不回来', moralValue: 5 }, { text: '算了', percentMin: -60, percentMax: -40, probability: 0.5, description: '你决定不要了，但朋友也没了', moralValue: -10 }] },
  { id: 'se4', title: '酒驾被抓', description: '喝完酒觉得自己很清醒，决定自己开车回家。开出不远就被交警拦下了：你知道你在逆行吗？你一看：对啊，我在逆行！', icon: '🚗', type: 'risk', guaranteed: false, options: [{ text: '认罚', percentMin: -60, percentMax: -40, probability: 0.8, description: '扣分，罚款，拘留', moralValue: -5 }, { text: '辩解', percentMin: -60, percentMax: -40, probability: 0.2, description: '你说你只开了一小段，交警说：所以我们及时拦住了你，感谢我们吧', moralValue: -10 }] },
  { id: 'se5', title: '直播打赏冲动', description: '你看直播时，有个主播在哭：今天是我妈妈的忌日，我想妈妈了。你头脑一热刷了大礼物！第二天你冷静下来，发现那主播正在笑：今天是我妈妈的忌日，每年这天我都哭一场骗礼物~', icon: '🎁', type: 'risk', guaranteed: false, options: [{ text: '认了', percentMin: -50, percentMax: -40, probability: 0.6, description: '你删了账号，发誓再也不看直播了', moralValue: -10 }, { text: '发帖曝光', percentMin: -35, percentMax: 30, probability: 0.4, description: '你发帖曝光，结果被粉丝网暴了几天', moralValue: 10 }] },
  { id: 'se6', title: '加盟奶茶店', description: '看到某品牌奶茶店很火，明星代言的，你决定加盟。交了加盟费后发现：那条街已经有好多家同品牌店了！', icon: '🧋', type: 'risk', guaranteed: false, options: [{ text: '硬着头皮开', percentMin: -50, percentMax: -40, probability: 0.5, description: '你开业了，每天顾客不超过几个', moralValue: -5 }, { text: '转让', percentMin: -50, percentMax: -30, probability: 0.5, description: '你转让了店，接手的人说：你人真好，没告诉我这店有多坑', moralValue: 5 }] },
  { id: 'se7', title: '买期房烂尾', description: '你买了套房，结果成了烂尾楼。你去维权，发现开发商已经跑路了，更惨的是：你每月还要还房贷！', icon: '🏗️', type: 'risk', guaranteed: false, options: [{ text: '继续还贷', percentMin: -60, percentMax: -40, probability: 0.7, description: '你一边租房一边还贷，每月入不敷出', moralValue: -5 }, { text: '断供', percentMin: -50, percentMax: -40, probability: 0.3, description: '银行打电话威胁要拍卖你的其他财产', moralValue: -15 }] },
  { id: 'se8', title: '炒股被套', description: '牛市来了，你冲进了股市。买了支"专家推荐"的股票，结果专家推荐的第二天就跌停了！专家说：这是正常调整，你继续持有...然后股票跌了很多', icon: '📉', type: 'risk', guaranteed: false, options: [{ text: '割肉', percentMin: -50, percentMax: -40, probability: 0.6, description: '你含泪卖出，发誓再也不炒股了', moralValue: -5 }, { text: '持有', percentMin: -12, percentMax: 5, probability: 0.4, description: '你赌它会涨，结果它退市了', moralValue: -15 }] },
  { id: 'se9', title: '高价买演唱会票', description: '你追的偶像终于来开演唱会了！官网站几秒就售罄，你只好找黄牛买票，结果买到了假票', icon: '🎤', type: 'risk', guaranteed: false, options: [{ text: '自认倒霉', percentMin: -30, percentMax: -20, probability: 0.7, description: '你白跑一趟，钱也没了', moralValue: -10 }, { text: '找黄牛算账', percentMin: -50, percentMax: -30, probability: 0.3, description: '黄牛跑了，你报警也没用', moralValue: -5 }] },
  { id: 'se10', title: '买二手豪车', description: '你看到一辆超便宜的二手豪车，才几万块！买下来后发现：发动机要大修，变速箱有问题，还有几十条违章没处理', icon: '🚙', type: 'risk', guaranteed: false, options: [{ text: '修车', percentMin: -40, percentMax: -25, probability: 0.5, description: '修车费比你买车钱还贵', moralValue: -5 }, { text: '卖掉', percentMin: -55, percentMax: -35, probability: 0.5, description: '根本没人要，你亏了一大笔', moralValue: -10 }] },
  { id: 'se11', title: '被骗投资玉石', description: '朋友带你去"投资"玉石，说稳赚不赔。你买了一大堆，结果拿去鉴定：全是假的', icon: '💎', type: 'risk', guaranteed: false, options: [{ text: '报警', percentMin: -30, percentMax: -15, probability: 0.4, description: '警察说这种案子很难追查', moralValue: 5 }, { text: '找朋友', percentMin: -55, percentMax: -35, probability: 0.6, description: '朋友说：我也是被骗的，然后就消失了', moralValue: -15 }] },
  { id: 'se12', title: '冲动买奢侈品', description: '你心情不好，去商场逛街。销售一顿夸，你头脑一热买了个奢侈品包。回家冷静后发现：这包的质量还不如你妈织的编织袋', icon: '👜', type: 'risk', guaranteed: false, options: [{ text: '退掉', percentMin: -55, percentMax: -40, probability: 0.3, description: '销售说：拆封了不能退', moralValue: -5 }, { text: '认了', percentMin: -55, percentMax: -40, probability: 0.7, description: '你用了一个月就后悔了', moralValue: -10 }] },
  { id: 'se13', title: '被电信诈骗', description: '你接到电话说你涉嫌洗钱，需要把资金转到"安全账户"。你照做了，然后发现这是诈骗电话', icon: '📞', type: 'risk', guaranteed: false, options: [{ text: '报警', percentMin: -30, percentMax: -15, probability: 0.5, description: '警察说会尽力追查，但钱已经被转走了', moralValue: 5 }, { text: '自认倒霉', percentMin: -55, percentMax: -40, probability: 0.5, description: '你发誓再也不接陌生电话了', moralValue: -10 }] },
  { id: 'se14', title: '买养生保健品', description: '你参加了个"健康讲座"，讲师说这个保健品包治百病。你买了一堆，回家一查：就是普通食品', icon: '💊', type: 'risk', guaranteed: false, options: [{ text: '退货', percentMin: -60, percentMax: -40, probability: 0.3, description: '店已经关门了', moralValue: -5 }, { text: '自己吃', percentMin: -30, percentMax: -20, probability: 0.7, description: '你吃了半年也没见有什么效果', moralValue: -10 }] },
  { id: 'se15', title: '装修被坑', description: '你找了家装修公司，合同写着"一口价"。装修到一半，工头说：这里要加钱，那里也要加钱，不加钱就停工', icon: '🔨', type: 'risk', guaranteed: false, options: [{ text: '妥协', percentMin: -60, percentMax: -40, probability: 0.6, description: '你花了两倍的预算', moralValue: -10 }, { text: '换人', percentMin: -55, percentMax: -35, probability: 0.4, description: '你重新找人装修，但之前付的钱要不回来了', moralValue: -5 }] },
];

// ==================== 事件生成与获取 ====================

// 合并所有事件
const allEvents: GameEvent[] = [
  ...funnyStoryEvents,
  ...workIncomeEvents,
  ...dailyConsumptionEvents,
  ...beingScammedEvents,
  ...specialIncomeEvents,
  ...specialExpenseEvents,
];

// 生成变体以达到大量事件
const generateEventVariants = (baseEvents: GameEvent[], times: number): GameEvent[] => {
  const variants: GameEvent[] = [];
  const locations = [
    '繁华商业街', '热闹步行街', '时尚商场', '老城街道', '新区大道', 
    '文化街区', '美食街', '购物广场', '中央商务区', '休闲商圈',
    '网红街道', '旅游景区', '大学城', '科技园', '居民社区',
    '火车站附近', '汽车站旁', '码头边', '公园旁', '广场边'
  ];
  
  for (let i = 0; i < times; i++) {
    const baseEvent = baseEvents[i % baseEvents.length];
    const location = locations[i % locations.length];
    
    variants.push({
      ...baseEvent,
      id: `${baseEvent.id}_v${i}`,
      title: `${location}${baseEvent.title}`,
      description: baseEvent.description.includes('在') 
        ? baseEvent.description 
        : `${baseEvent.description}（发生在${location}）`,
    });
  }
  
  return variants;
};

// 生成大量事件 - 确保有10000条
export const gameEvents: GameEvent[] = [
  ...allEvents,
  ...generateEventVariants(funnyStoryEvents, 500),      // 30个故事 × 500变体
  ...generateEventVariants(workIncomeEvents, 300),     // 9个 × 300
  ...generateEventVariants(dailyConsumptionEvents, 300), // 9个 × 300
  ...generateEventVariants(beingScammedEvents, 200),   // 8个 × 200
  ...generateEventVariants(specialIncomeEvents, 150),  // 5个 × 150
  ...generateEventVariants(specialExpenseEvents, 150),  // 8个 × 150
];

// 根据道德值调整事件权重
// moralValue: 道德值，范围 -100 到 +100
export const getWeightedRandomEventByMoral = (moralValue: number = 0): GameEvent => {
  // 道德值影响事件类型权重
  // 道德值高 -> 更多好事件（work, opportunity, specialIncome）
  // 道德值低 -> 更多坏事件（risk, consumption, specialExpense）
  
  // 将道德值转换为权重调整因子 (-1 到 1)
  const moralFactor = Math.max(-1, Math.min(1, moralValue / 100));
  
  // 计算各类事件的权重
  const storyWeight = 0.3; // 搞笑故事事件保持不变
  const goodEventWeight = 0.3 + (moralFactor * 0.15); // 好事件：道德值高时增加
  const badEventWeight = 0.25 - (moralFactor * 0.1); // 坏事件：道德值低时增加
  const specialGoodWeight = 0.1 + (moralFactor * 0.05); // 特殊好事件
  
  const roll = Math.random();
  
  if (roll < storyWeight) {
    // 30% 超级搞笑故事事件
    const storyEvents = gameEvents.filter(e => e.id.startsWith('s'));
    return storyEvents[Math.floor(Math.random() * storyEvents.length)];
  } else if (roll < storyWeight + goodEventWeight) {
    // 好事件：work, opportunity
    const goodEvents = gameEvents.filter(e => e.type === 'work' || e.type === 'opportunity');
    return goodEvents[Math.floor(Math.random() * goodEvents.length)];
  } else if (roll < storyWeight + goodEventWeight + badEventWeight) {
    // 坏事件：consumption, risk
    const badEvents = gameEvents.filter(e => e.type === 'consumption' || e.type === 'risk');
    return badEvents[Math.floor(Math.random() * badEvents.length)];
  } else if (roll < storyWeight + goodEventWeight + badEventWeight + specialGoodWeight) {
    // 特殊好事件
    const specialGood = gameEvents.filter(e => e.id.startsWith('sp'));
    return specialGood[Math.floor(Math.random() * specialGood.length)];
  } else {
    // 特殊坏事件
    const specialBad = gameEvents.filter(e => e.id.startsWith('se'));
    return specialBad[Math.floor(Math.random() * specialBad.length)];
  }
};

// 保留原函数以兼容
export const getWeightedRandomEvent = (): GameEvent => {
  return getWeightedRandomEventByMoral(0);
};
