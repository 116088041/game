// 中国省市区数据 - 带详细区域信息（严格按城市归属）
export interface District {
  name: string;
  type: 'district' | 'business' | 'scenic' | 'street';
}

export interface City {
  name: string;
  code: string;
  districts: District[];
}

export interface Province {
  name: string;
  code: string;
  cities: City[];
}

// 兼容性别名
export type { Province as ProvinceData, City as CityData };

// ========== 各城市区域数据 ==========

// 北京市
const beijingDistricts: District[] = [
  { name: '三里屯商圈', type: 'business' },
  { name: '国贸CBD', type: 'business' },
  { name: '王府井步行街', type: 'street' },
  { name: '中关村科技园', type: 'business' },
  { name: '故宫博物院', type: 'scenic' },
  { name: '长城', type: 'scenic' },
  { name: '颐和园', type: 'scenic' },
  { name: '朝阳区分局', type: 'district' },
  { name: '西城区', type: 'district' },
  { name: '海淀区', type: 'district' },
  { name: '东城区', type: 'district' },
  { name: '望京SOHO', type: 'business' },
];

// 上海市
const shanghaiDistricts: District[] = [
  { name: '外滩', type: 'scenic' },
  { name: '陆家嘴金融区', type: 'business' },
  { name: '南京路步行街', type: 'street' },
  { name: '徐家汇商圈', type: 'business' },
  { name: '静安区', type: 'district' },
  { name: '黄浦区', type: 'district' },
  { name: '浦东新区', type: 'district' },
  { name: '新天地', type: 'business' },
  { name: '田子坊', type: 'street' },
  { name: '豫园', type: 'scenic' },
  { name: '迪士尼乐园', type: 'scenic' },
  { name: '城隍庙', type: 'scenic' },
];

// 广州市
const guangzhouDistricts: District[] = [
  { name: '天河城商圈', type: 'business' },
  { name: '珠江新城', type: 'business' },
  { name: '北京路步行街', type: 'street' },
  { name: '上下九步行街', type: 'street' },
  { name: '越秀区', type: 'district' },
  { name: '天河区', type: 'district' },
  { name: '白云山', type: 'scenic' },
  { name: '广州塔', type: 'scenic' },
  { name: '荔湾区', type: 'district' },
  { name: '番禺区长隆', type: 'scenic' },
  { name: '花城汇', type: 'business' },
  { name: '太古汇', type: 'business' },
];

// 深圳市
const shenzhenDistricts: District[] = [
  { name: '华强北商业街', type: 'street' },
  { name: '东门老街', type: 'street' },
  { name: '南山科技园', type: 'business' },
  { name: '福田CBD', type: 'business' },
  { name: '世界之窗', type: 'scenic' },
  { name: '东部华侨城', type: 'scenic' },
  { name: '南山区', type: 'district' },
  { name: '福田区', type: 'district' },
  { name: '罗湖区', type: 'district' },
  { name: '欢乐谷', type: 'scenic' },
  { name: '海岸城', type: 'business' },
  { name: '深圳湾公园', type: 'scenic' },
];

// 杭州市
const hangzhouDistricts: District[] = [
  { name: '西湖景区', type: 'scenic' },
  { name: '河坊街', type: 'street' },
  { name: '武林广场商圈', type: 'business' },
  { name: '湖滨银泰', type: 'business' },
  { name: '钱江新城', type: 'business' },
  { name: '宋城', type: 'scenic' },
  { name: '西溪湿地', type: 'scenic' },
  { name: '上城区', type: 'district' },
  { name: '下城区', type: 'district' },
  { name: '拱墅区', type: 'district' },
  { name: '滨江高新区', type: 'business' },
  { name: '雷峰塔', type: 'scenic' },
];

// 成都市
const chengduDistricts: District[] = [
  { name: '春熙路商圈', type: 'business' },
  { name: '太古里', type: 'street' },
  { name: '锦里古街', type: 'street' },
  { name: '宽窄巷子', type: 'street' },
  { name: '武侯祠', type: 'scenic' },
  { name: '大熊猫基地', type: 'scenic' },
  { name: '高新南区', type: 'district' },
  { name: '锦江区', type: 'district' },
  { name: '青羊区', type: 'district' },
  { name: '都江堰', type: 'scenic' },
  { name: '青城山', type: 'scenic' },
  { name: '339电视塔', type: 'scenic' },
];

// 南京市
const nanjingDistricts: District[] = [
  { name: '新街口商圈', type: 'business' },
  { name: '夫子庙', type: 'street' },
  { name: '秦淮河畔', type: 'scenic' },
  { name: '中山陵', type: 'scenic' },
  { name: '玄武湖', type: 'scenic' },
  { name: '鼓楼区', type: 'district' },
  { name: '玄武区', type: 'district' },
  { name: '老门东', type: 'street' },
  { name: '紫金山', type: 'scenic' },
  { name: '明孝陵', type: 'scenic' },
  { name: '湖南路', type: 'street' },
  { name: '河西新城', type: 'business' },
];

// 武汉市
const wuhanDistricts: District[] = [
  { name: '光谷商圈', type: 'business' },
  { name: '楚河汉街', type: 'street' },
  { name: '江汉路步行街', type: 'street' },
  { name: '黄鹤楼', type: 'scenic' },
  { name: '东湖风景区', type: 'scenic' },
  { name: '武昌区', type: 'district' },
  { name: '汉口区', type: 'district' },
  { name: '汉阳区', type: 'district' },
  { name: '户部巷', type: 'street' },
  { name: '武汉长江大桥', type: 'scenic' },
  { name: '昙华林', type: 'street' },
  { name: '武汉天地', type: 'business' },
];

// 西安市
const xianDistricts: District[] = [
  { name: '钟楼商圈', type: 'business' },
  { name: '回民街', type: 'street' },
  { name: '大唐不夜城', type: 'street' },
  { name: '大雁塔', type: 'scenic' },
  { name: '秦始皇兵马俑', type: 'scenic' },
  { name: '城墙', type: 'scenic' },
  { name: '碑林区', type: 'district' },
  { name: '雁塔区', type: 'district' },
  { name: '小寨商圈', type: 'business' },
  { name: '大明宫', type: 'scenic' },
  { name: '永兴坊', type: 'street' },
  { name: '大悦城', type: 'business' },
];

// 重庆市 - 单一城市模式
const chongqingDistricts: District[] = [
  { name: '解放碑商圈', type: 'business' },
  { name: '洪崖洞', type: 'scenic' },
  { name: '磁器口古镇', type: 'street' },
  { name: '观音桥商圈', type: 'business' },
  { name: '长江索道', type: 'scenic' },
  { name: '武隆天坑', type: 'scenic' },
  { name: '渝中区', type: 'district' },
  { name: '江北区', type: 'district' },
  { name: '南岸区', type: 'district' },
  { name: '鹅岭二厂', type: 'street' },
  { name: '南山一棵树', type: 'scenic' },
  { name: '三峡广场', type: 'business' },
];

// 苏州市
const suzhouDistricts: District[] = [
  { name: '观前街', type: 'street' },
  { name: '平江路', type: 'street' },
  { name: '苏州工业园区', type: 'business' },
  { name: '拙政园', type: 'scenic' },
  { name: '周庄古镇', type: 'scenic' },
  { name: '虎丘', type: 'scenic' },
  { name: '姑苏区', type: 'district' },
  { name: '吴中区', type: 'district' },
  { name: '同里古镇', type: 'scenic' },
  { name: '山塘街', type: 'street' },
  { name: '金鸡湖景区', type: 'scenic' },
  { name: '苏州中心', type: 'business' },
];

// 天津市
const tianjinDistricts: District[] = [
  { name: '滨江道商业街', type: 'street' },
  { name: '小白楼商圈', type: 'business' },
  { name: '五大道', type: 'street' },
  { name: '天津古文化街', type: 'street' },
  { name: '意式风情区', type: 'scenic' },
  { name: '天津之眼', type: 'scenic' },
  { name: '和平区', type: 'district' },
  { name: '河西区', type: 'district' },
];

// 石家庄市
const shijiazhuangDistricts: District[] = [
  { name: '中山路步行街', type: 'street' },
  { name: '北国商城', type: 'business' },
  { name: '正定古城', type: 'scenic' },
  { name: '裕华区', type: 'district' },
  { name: '长安区', type: 'district' },
  { name: '民心河步道', type: 'scenic' },
  { name: '万达广场(石家庄)', type: 'business' },
  { name: '火车北站商圈', type: 'business' },
];

// 太原市
const taiyuanDistricts: District[] = [
  { name: '柳巷商业街', type: 'street' },
  { name: '长风商务区', type: 'business' },
  { name: '晋祠博物馆', type: 'scenic' },
  { name: '迎泽区', type: 'district' },
  { name: '杏花岭区', type: 'district' },
  { name: '食品街', type: 'street' },
  { name: '万象城(太原)', type: 'business' },
  { name: '汾河公园', type: 'scenic' },
];

// 沈阳市
const shenyangDistricts: District[] = [
  { name: '中街步行街', type: 'street' },
  { name: '太原街商圈', type: 'business' },
  { name: '沈阳故宫', type: 'scenic' },
  { name: '沈河区', type: 'district' },
  { name: '和平区(沈阳)', type: 'district' },
  { name: '铁西广场', type: 'business' },
  { name: '张氏帅府', type: 'scenic' },
  { name: '奥体中心', type: 'scenic' },
];

// 大连市
const dalianDistricts: District[] = [
  { name: '星海广场', type: 'scenic' },
  { name: '老虎滩海洋公园', type: 'scenic' },
  { name: '俄罗斯风情街', type: 'street' },
  { name: '中山区(大连)', type: 'district' },
  { name: '西岗区', type: 'district' },
  { name: '青泥洼桥商圈', type: 'business' },
  { name: '金石滩', type: 'scenic' },
  { name: '万达广场(大连)', type: 'business' },
];

// 青岛市
const qingdaoDistricts: District[] = [
  { name: '栈桥', type: 'scenic' },
  { name: '五四广场', type: 'scenic' },
  { name: '台东步行街', type: 'street' },
  { name: '市南区(青岛)', type: 'district' },
  { name: '崂山区(青岛)', type: 'district' },
  { name: '劈柴院', type: 'street' },
  { name: '金沙滩', type: 'scenic' },
  { name: '万象城(青岛)', type: 'business' },
];

// 长沙市
const changshaDistricts: District[] = [
  { name: '五一广场商圈', type: 'business' },
  { name: '太平老街', type: 'street' },
  { name: '坡子街', type: 'street' },
  { name: '橘子洲', type: 'scenic' },
  { name: '岳麓山', type: 'scenic' },
  { name: '天心区', type: 'district' },
  { name: '芙蓉区', type: 'district' },
  { name: '黄兴路步行街', type: 'street' },
];

// 郑州市
const zhengzhouDistricts: District[] = [
  { name: '二七广场商圈', type: 'business' },
  { name: '德化街', type: 'street' },
  { name: '大卫城', type: 'business' },
  { name: '金水区', type: 'district' },
  { name: '中原区', type: 'district' },
  { name: '如意湖', type: 'scenic' },
  { name: '郑州东站商圈', type: 'business' },
  { name: '少林寺', type: 'scenic' },
];

// 东莞市
const dongguanDistricts: District[] = [
  { name: '鸿福路商圈', type: 'business' },
  { name: '东城酒吧街', type: 'street' },
  { name: '南城步行街', type: 'street' },
  { name: '松山湖', type: 'scenic' },
  { name: '长安镇', type: 'district' },
  { name: '虎门镇', type: 'district' },
  { name: '万江街道', type: 'district' },
  { name: '东莞CBD', type: 'business' },
];

// 佛山市
const foshanDistricts: District[] = [
  { name: '祖庙商圈', type: 'business' },
  { name: '岭南天地', type: 'street' },
  { name: '千灯湖', type: 'scenic' },
  { name: '顺德区', type: 'district' },
  { name: '南海区', type: 'district' },
  { name: '清晖园', type: 'scenic' },
  { name: '西樵山', type: 'scenic' },
  { name: '佛山新城', type: 'business' },
];

// 珠海市
const zhuhaiDistricts: District[] = [
  { name: '拱北口岸', type: 'district' },
  { name: '情侣路', type: 'scenic' },
  { name: '珠海渔女', type: 'scenic' },
  { name: '横琴新区', type: 'district' },
  { name: '香洲区', type: 'district' },
  { name: '吉大商圈', type: 'business' },
  { name: '长隆海洋王国', type: 'scenic' },
  { name: '日月贝', type: 'scenic' },
];

// 厦门市
const xiamenDistricts: District[] = [
  { name: '中山路步行街(厦门)', type: 'street' },
  { name: '鼓浪屿', type: 'scenic' },
  { name: '曾厝垵', type: 'street' },
  { name: '厦门大学', type: 'scenic' },
  { name: '思明区', type: 'district' },
  { name: '湖里区', type: 'district' },
  { name: '沙坡尾', type: 'street' },
  { name: '观音山商务区', type: 'business' },
];

// 昆明市
const kunmingDistricts: District[] = [
  { name: '南屏步行街', type: 'street' },
  { name: '翠湖公园', type: 'scenic' },
  { name: '正义坊商圈', type: 'business' },
  { name: '五华区', type: 'district' },
  { name: '盘龙区', type: 'district' },
  { name: '石林景区', type: 'scenic' },
  { name: '滇池海埂', type: 'scenic' },
  { name: '官渡古镇', type: 'street' },
];

// 南昌市
const nanchangDistricts: District[] = [
  { name: '滕王阁', type: 'scenic' },
  { name: '秋水广场', type: 'scenic' },
  { name: '中山路步行街(南昌)', type: 'street' },
  { name: '红谷滩新区', type: 'district' },
  { name: '东湖区(南昌)', type: 'district' },
  { name: '绳金塔美食街', type: 'street' },
  { name: '八一广场', type: 'scenic' },
  { name: '万达广场(南昌)', type: 'business' },
];

// 济南市
const jinanDistricts: District[] = [
  { name: '泉城路商圈', type: 'business' },
  { name: '芙蓉街', type: 'street' },
  { name: '大明湖', type: 'scenic' },
  { name: '趵突泉', type: 'scenic' },
  { name: '历下区', type: 'district' },
  { name: '市中区(济南)', type: 'district' },
  { name: '宽厚里', type: 'street' },
  { name: '恒隆广场', type: 'business' },
];

// 福州市
const fuzhouDistricts: District[] = [
  { name: '三坊七巷', type: 'street' },
  { name: '东街口商圈', type: 'business' },
  { name: '上下杭', type: 'street' },
  { name: '鼓山', type: 'scenic' },
  { name: '台江区', type: 'district' },
  { name: '仓山区', type: 'district' },
  { name: '西湖公园', type: 'scenic' },
  { name: '五四北泰禾', type: 'business' },
];

// 贵阳市
const guiyangDistricts: District[] = [
  { name: '花果园商圈', type: 'business' },
  { name: '甲秀楼', type: 'scenic' },
  { name: '黔灵山公园', type: 'scenic' },
  { name: '南明区', type: 'district' },
  { name: '云岩区', type: 'district' },
  { name: '喷水池商圈', type: 'business' },
  { name: '青岩古镇', type: 'scenic' },
  { name: '逸天城', type: 'business' },
];

// 南宁市
const nanningDistricts: District[] = [
  { name: '朝阳广场商圈', type: 'business' },
  { name: '中山路美食街', type: 'street' },
  { name: '东盟商务区', type: 'business' },
  { name: '青秀区', type: 'district' },
  { name: '兴宁区', type: 'district' },
  { name: '南湖公园', type: 'scenic' },
  { name: '埌东CBD', type: 'business' },
  { name: '南宁动物园', type: 'scenic' },
];

// 哈尔滨市
const haerbinDistricts: District[] = [
  { name: '中央大街(哈尔滨)', type: 'street' },
  { name: '防洪纪念塔', type: 'scenic' },
  { name: '索菲亚教堂', type: 'scenic' },
  { name: '道里区', type: 'district' },
  { name: '南岗区', type: 'district' },
  { name: '秋林商圈', type: 'business' },
  { name: '冰雪大世界', type: 'scenic' },
  { name: '防洪江畔', type: 'scenic' },
];

// 长春市
const changchunDistricts: District[] = [
  { name: '重庆路商圈(长春)', type: 'business' },
  { name: '桂林路步行街', type: 'street' },
  { name: '这有山商场', type: 'business' },
  { name: '朝阳区(长春)', type: 'district' },
  { name: '南关区', type: 'district' },
  { name: '伪满皇宫', type: 'scenic' },
  { name: '净月潭', type: 'scenic' },
  { name: '红旗街商圈', type: 'business' },
];

// 兰州市
const lanzhouDistricts: District[] = [
  { name: '西关十字商圈', type: 'business' },
  { name: '正宁路夜市', type: 'street' },
  { name: '东方红广场', type: 'district' },
  { name: '城关区(兰州)', type: 'district' },
  { name: '七里河区', type: 'district' },
  { name: '黄河风情线', type: 'scenic' },
  { name: '中山桥', type: 'scenic' },
  { name: '兰州中心', type: 'business' },
];

// 乌鲁木齐市
const wulumuqiDistricts: District[] = [
  { name: '大巴扎(乌鲁木齐)', type: 'street' },
  { name: '中山路商圈(乌鲁木齐)', type: 'business' },
  { name: '天山区', type: 'district' },
  { name: '沙依巴克区', type: 'district' },
  { name: '红山公园', type: 'scenic' },
  { name: '友好路商圈', type: 'business' },
  { name: '新疆民街', type: 'street' },
  { name: '国际大巴扎', type: 'scenic' },
];

// ========== 默认区域生成函数 ==========
const generateDefaultDistricts = (cityName: string): District[] => {
  return [
    { name: `${cityName}市中心`, type: 'business' },
    { name: `${cityName}步行街`, type: 'street' },
    { name: `${cityName}区政府`, type: 'district' },
    { name: `${cityName}科技园`, type: 'business' },
    { name: `${cityName}公园`, type: 'scenic' },
    { name: `${cityName}美食街`, type: 'street' },
    { name: `${cityName}商业广场`, type: 'business' },
    { name: `${cityName}体育馆`, type: 'scenic' },
  ];
};

// ========== 导出省份数据 ==========
export const chinaProvinces: Province[] = [
  {
    name: "北京市",
    code: "110000",
    cities: [
      { name: "北京市", code: "110100", districts: beijingDistricts }
    ]
  },
  {
    name: "天津市",
    code: "120000",
    cities: [
      { name: "天津市", code: "120100", districts: tianjinDistricts }
    ]
  },
  {
    name: "上海市",
    code: "310000",
    cities: [
      { name: "上海市", code: "310100", districts: shanghaiDistricts }
    ]
  },
  {
    name: "重庆市",
    code: "500000",
    cities: [
      { name: "重庆市", code: "500100", districts: chongqingDistricts }
    ]
  },
  {
    name: "广东省",
    code: "440000",
    cities: [
      { name: "广州市", code: "440101", districts: guangzhouDistricts },
      { name: "深圳市", code: "440301", districts: shenzhenDistricts },
      { name: "东莞市", code: "441901", districts: dongguanDistricts },
      { name: "佛山市", code: "440601", districts: foshanDistricts },
      { name: "珠海市", code: "440401", districts: zhuhaiDistricts },
      { name: "汕头市", code: "440501", districts: generateDefaultDistricts('汕头') },
      { name: "湛江市", code: "440801", districts: generateDefaultDistricts('湛江') },
      { name: "中山市", code: "442001", districts: generateDefaultDistricts('中山') },
      { name: "惠州市", code: "441301", districts: generateDefaultDistricts('惠州') },
      { name: "江门市", code: "440701", districts: generateDefaultDistricts('江门') },
    ]
  },
  {
    name: "浙江省",
    code: "330000",
    cities: [
      { name: "杭州市", code: "330101", districts: hangzhouDistricts },
      { name: "宁波市", code: "330201", districts: generateDefaultDistricts('宁波') },
      { name: "温州市", code: "330301", districts: generateDefaultDistricts('温州') },
      { name: "嘉兴市", code: "330401", districts: generateDefaultDistricts('嘉兴') },
      { name: "湖州市", code: "330501", districts: generateDefaultDistricts('湖州') },
      { name: "绍兴市", code: "330601", districts: generateDefaultDistricts('绍兴') },
      { name: "金华市", code: "330701", districts: generateDefaultDistricts('金华') },
      { name: "衢州市", code: "330801", districts: generateDefaultDistricts('衢州') },
      { name: "舟山市", code: "330901", districts: generateDefaultDistricts('舟山') },
      { name: "台州市", code: "331001", districts: generateDefaultDistricts('台州') },
      { name: "丽水市", code: "331101", districts: generateDefaultDistricts('丽水') },
    ]
  },
  {
    name: "江苏省",
    code: "320000",
    cities: [
      { name: "南京市", code: "320101", districts: nanjingDistricts },
      { name: "苏州市", code: "320501", districts: suzhouDistricts },
      { name: "无锡市", code: "320201", districts: generateDefaultDistricts('无锡') },
      { name: "徐州市", code: "320301", districts: generateDefaultDistricts('徐州') },
      { name: "常州市", code: "320401", districts: generateDefaultDistricts('常州') },
      { name: "南通市", code: "320601", districts: generateDefaultDistricts('南通') },
      { name: "连云港市", code: "320701", districts: generateDefaultDistricts('连云港') },
      { name: "淮安市", code: "320801", districts: generateDefaultDistricts('淮安') },
      { name: "盐城市", code: "320901", districts: generateDefaultDistricts('盐城') },
      { name: "扬州市", code: "321001", districts: generateDefaultDistricts('扬州') },
      { name: "镇江市", code: "321101", districts: generateDefaultDistricts('镇江') },
      { name: "泰州市", code: "321201", districts: generateDefaultDistricts('泰州') },
      { name: "宿迁市", code: "321301", districts: generateDefaultDistricts('宿迁') },
    ]
  },
  {
    name: "四川省",
    code: "510000",
    cities: [
      { name: "成都市", code: "510101", districts: chengduDistricts },
      { name: "自贡市", code: "510301", districts: generateDefaultDistricts('自贡') },
      { name: "攀枝花市", code: "510401", districts: generateDefaultDistricts('攀枝花') },
      { name: "泸州市", code: "510501", districts: generateDefaultDistricts('泸州') },
      { name: "德阳市", code: "510601", districts: generateDefaultDistricts('德阳') },
      { name: "绵阳市", code: "510701", districts: generateDefaultDistricts('绵阳') },
      { name: "广元市", code: "510801", districts: generateDefaultDistricts('广元') },
      { name: "遂宁市", code: "510901", districts: generateDefaultDistricts('遂宁') },
      { name: "内江市", code: "511001", districts: generateDefaultDistricts('内江') },
      { name: "乐山市", code: "511101", districts: generateDefaultDistricts('乐山') },
      { name: "南充市", code: "511301", districts: generateDefaultDistricts('南充') },
      { name: "眉山市", code: "511401", districts: generateDefaultDistricts('眉山') },
      { name: "宜宾市", code: "511501", districts: generateDefaultDistricts('宜宾') },
      { name: "广安市", code: "511601", districts: generateDefaultDistricts('广安') },
      { name: "达州市", code: "511701", districts: generateDefaultDistricts('达州') },
      { name: "雅安市", code: "511801", districts: generateDefaultDistricts('雅安') },
      { name: "巴中市", code: "511901", districts: generateDefaultDistricts('巴中') },
      { name: "资阳市", code: "512001", districts: generateDefaultDistricts('资阳') },
    ]
  },
  {
    name: "湖北省",
    code: "420000",
    cities: [
      { name: "武汉市", code: "420101", districts: wuhanDistricts },
      { name: "黄石市", code: "420201", districts: generateDefaultDistricts('黄石') },
      { name: "十堰市", code: "420301", districts: generateDefaultDistricts('十堰') },
      { name: "宜昌市", code: "420501", districts: generateDefaultDistricts('宜昌') },
      { name: "襄阳市", code: "420601", districts: generateDefaultDistricts('襄阳') },
      { name: "鄂州市", code: "420701", districts: generateDefaultDistricts('鄂州') },
      { name: "荆门市", code: "420801", districts: generateDefaultDistricts('荆门') },
      { name: "孝感市", code: "420901", districts: generateDefaultDistricts('孝感') },
      { name: "荆州市", code: "421001", districts: generateDefaultDistricts('荆州') },
      { name: "黄冈市", code: "421101", districts: generateDefaultDistricts('黄冈') },
      { name: "咸宁市", code: "421201", districts: generateDefaultDistricts('咸宁') },
      { name: "随州市", code: "421301", districts: generateDefaultDistricts('随州') },
    ]
  },
  {
    name: "陕西省",
    code: "610000",
    cities: [
      { name: "西安市", code: "610101", districts: xianDistricts },
      { name: "铜川市", code: "610201", districts: generateDefaultDistricts('铜川') },
      { name: "宝鸡市", code: "610301", districts: generateDefaultDistricts('宝鸡') },
      { name: "咸阳市", code: "610401", districts: generateDefaultDistricts('咸阳') },
      { name: "渭南市", code: "610501", districts: generateDefaultDistricts('渭南') },
      { name: "延安市", code: "610601", districts: generateDefaultDistricts('延安') },
      { name: "汉中市", code: "610701", districts: generateDefaultDistricts('汉中') },
      { name: "榆林市", code: "610801", districts: generateDefaultDistricts('榆林') },
      { name: "安康市", code: "610901", districts: generateDefaultDistricts('安康') },
      { name: "商洛市", code: "611001", districts: generateDefaultDistricts('商洛') },
    ]
  },
  {
    name: "湖南省",
    code: "430000",
    cities: [
      { name: "长沙市", code: "430101", districts: changshaDistricts },
      { name: "株洲市", code: "430201", districts: generateDefaultDistricts('株洲') },
      { name: "湘潭市", code: "430301", districts: generateDefaultDistricts('湘潭') },
      { name: "衡阳市", code: "430401", districts: generateDefaultDistricts('衡阳') },
      { name: "邵阳市", code: "430501", districts: generateDefaultDistricts('邵阳') },
      { name: "岳阳市", code: "430601", districts: generateDefaultDistricts('岳阳') },
      { name: "常德市", code: "430701", districts: generateDefaultDistricts('常德') },
      { name: "张家界市", code: "430801", districts: generateDefaultDistricts('张家界') },
      { name: "益阳市", code: "430901", districts: generateDefaultDistricts('益阳') },
      { name: "郴州市", code: "431001", districts: generateDefaultDistricts('郴州') },
      { name: "永州市", code: "431101", districts: generateDefaultDistricts('永州') },
      { name: "怀化市", code: "431201", districts: generateDefaultDistricts('怀化') },
      { name: "娄底市", code: "431301", districts: generateDefaultDistricts('娄底') },
    ]
  },
  {
    name: "山东省",
    code: "370000",
    cities: [
      { name: "济南市", code: "370101", districts: jinanDistricts },
      { name: "青岛市", code: "370201", districts: qingdaoDistricts },
      { name: "淄博市", code: "370301", districts: generateDefaultDistricts('淄博') },
      { name: "枣庄市", code: "370401", districts: generateDefaultDistricts('枣庄') },
      { name: "东营市", code: "370501", districts: generateDefaultDistricts('东营') },
      { name: "烟台市", code: "370601", districts: generateDefaultDistricts('烟台') },
      { name: "潍坊市", code: "370701", districts: generateDefaultDistricts('潍坊') },
      { name: "济宁市", code: "370801", districts: generateDefaultDistricts('济宁') },
      { name: "泰安市", code: "370901", districts: generateDefaultDistricts('泰安') },
      { name: "威海市", code: "371001", districts: generateDefaultDistricts('威海') },
      { name: "日照市", code: "371101", districts: generateDefaultDistricts('日照') },
      { name: "临沂市", code: "371301", districts: generateDefaultDistricts('临沂') },
      { name: "德州市", code: "371401", districts: generateDefaultDistricts('德州') },
      { name: "聊城市", code: "371501", districts: generateDefaultDistricts('聊城') },
      { name: "滨州市", code: "371601", districts: generateDefaultDistricts('滨州') },
      { name: "菏泽市", code: "371701", districts: generateDefaultDistricts('菏泽') },
    ]
  },
  {
    name: "河南省",
    code: "410000",
    cities: [
      { name: "郑州市", code: "410101", districts: zhengzhouDistricts },
      { name: "开封市", code: "410201", districts: generateDefaultDistricts('开封') },
      { name: "洛阳市", code: "410301", districts: generateDefaultDistricts('洛阳') },
      { name: "平顶山市", code: "410401", districts: generateDefaultDistricts('平顶山') },
      { name: "安阳市", code: "410501", districts: generateDefaultDistricts('安阳') },
      { name: "鹤壁市", code: "410601", districts: generateDefaultDistricts('鹤壁') },
      { name: "新乡市", code: "410701", districts: generateDefaultDistricts('新乡') },
      { name: "焦作市", code: "410801", districts: generateDefaultDistricts('焦作') },
      { name: "濮阳市", code: "410901", districts: generateDefaultDistricts('濮阳') },
      { name: "许昌市", code: "411001", districts: generateDefaultDistricts('许昌') },
      { name: "漯河市", code: "411101", districts: generateDefaultDistricts('漯河') },
      { name: "三门峡市", code: "411201", districts: generateDefaultDistricts('三门峡') },
      { name: "南阳市", code: "411301", districts: generateDefaultDistricts('南阳') },
      { name: "商丘市", code: "411401", districts: generateDefaultDistricts('商丘') },
      { name: "信阳市", code: "411501", districts: generateDefaultDistricts('信阳') },
      { name: "周口市", code: "411601", districts: generateDefaultDistricts('周口') },
      { name: "驻马店市", code: "411701", districts: generateDefaultDistricts('驻马店') },
    ]
  },
  {
    name: "辽宁省",
    code: "210000",
    cities: [
      { name: "沈阳市", code: "210101", districts: shenyangDistricts },
      { name: "大连市", code: "210201", districts: dalianDistricts },
      { name: "鞍山市", code: "210301", districts: generateDefaultDistricts('鞍山') },
      { name: "抚顺市", code: "210401", districts: generateDefaultDistricts('抚顺') },
      { name: "本溪市", code: "210501", districts: generateDefaultDistricts('本溪') },
      { name: "丹东市", code: "210601", districts: generateDefaultDistricts('丹东') },
      { name: "锦州市", code: "210701", districts: generateDefaultDistricts('锦州') },
      { name: "营口市", code: "210801", districts: generateDefaultDistricts('营口') },
      { name: "阜新市", code: "210901", districts: generateDefaultDistricts('阜新') },
      { name: "辽阳市", code: "211001", districts: generateDefaultDistricts('辽阳') },
      { name: "盘锦市", code: "211101", districts: generateDefaultDistricts('盘锦') },
      { name: "铁岭市", code: "211201", districts: generateDefaultDistricts('铁岭') },
      { name: "朝阳市", code: "211301", districts: generateDefaultDistricts('朝阳') },
      { name: "葫芦岛市", code: "211401", districts: generateDefaultDistricts('葫芦岛') },
    ]
  },
  {
    name: "福建省",
    code: "350000",
    cities: [
      { name: "福州市", code: "350101", districts: fuzhouDistricts },
      { name: "厦门市", code: "350201", districts: xiamenDistricts },
      { name: "莆田市", code: "350301", districts: generateDefaultDistricts('莆田') },
      { name: "三明市", code: "350401", districts: generateDefaultDistricts('三明') },
      { name: "泉州市", code: "350501", districts: generateDefaultDistricts('泉州') },
      { name: "漳州市", code: "350601", districts: generateDefaultDistricts('漳州') },
      { name: "南平市", code: "350701", districts: generateDefaultDistricts('南平') },
      { name: "龙岩市", code: "350801", districts: generateDefaultDistricts('龙岩') },
      { name: "宁德市", code: "350901", districts: generateDefaultDistricts('宁德') },
    ]
  },
  {
    name: "安徽省",
    code: "340000",
    cities: [
      { name: "合肥市", code: "340101", districts: generateDefaultDistricts('合肥') },
      { name: "芜湖市", code: "340201", districts: generateDefaultDistricts('芜湖') },
      { name: "蚌埠市", code: "340301", districts: generateDefaultDistricts('蚌埠') },
      { name: "淮南市", code: "340401", districts: generateDefaultDistricts('淮南') },
      { name: "马鞍山市", code: "340501", districts: generateDefaultDistricts('马鞍山') },
      { name: "淮北市", code: "340601", districts: generateDefaultDistricts('淮北') },
      { name: "铜陵市", code: "340701", districts: generateDefaultDistricts('铜陵') },
      { name: "安庆市", code: "340801", districts: generateDefaultDistricts('安庆') },
      { name: "黄山市", code: "341001", districts: generateDefaultDistricts('黄山') },
      { name: "滁州市", code: "341101", districts: generateDefaultDistricts('滁州') },
      { name: "阜阳市", code: "341201", districts: generateDefaultDistricts('阜阳') },
      { name: "宿州市", code: "341301", districts: generateDefaultDistricts('宿州') },
      { name: "六安市", code: "341501", districts: generateDefaultDistricts('六安') },
      { name: "亳州市", code: "341601", districts: generateDefaultDistricts('亳州') },
      { name: "池州市", code: "341701", districts: generateDefaultDistricts('池州') },
      { name: "宣城市", code: "341801", districts: generateDefaultDistricts('宣城') },
    ]
  },
  {
    name: "江西省",
    code: "360000",
    cities: [
      { name: "南昌市", code: "360101", districts: nanchangDistricts },
      { name: "景德镇市", code: "360201", districts: generateDefaultDistricts('景德镇') },
      { name: "萍乡市", code: "360301", districts: generateDefaultDistricts('萍乡') },
      { name: "九江市", code: "360401", districts: generateDefaultDistricts('九江') },
      { name: "新余市", code: "360501", districts: generateDefaultDistricts('新余') },
      { name: "鹰潭市", code: "360601", districts: generateDefaultDistricts('鹰潭') },
      { name: "赣州市", code: "360701", districts: generateDefaultDistricts('赣州') },
      { name: "吉安市", code: "360801", districts: generateDefaultDistricts('吉安') },
      { name: "宜春市", code: "360901", districts: generateDefaultDistricts('宜春') },
      { name: "抚州市", code: "361001", districts: generateDefaultDistricts('抚州') },
      { name: "上饶市", code: "361101", districts: generateDefaultDistricts('上饶') },
    ]
  },
  {
    name: "云南省",
    code: "530000",
    cities: [
      { name: "昆明市", code: "530101", districts: kunmingDistricts },
      { name: "曲靖市", code: "530301", districts: generateDefaultDistricts('曲靖') },
      { name: "玉溪市", code: "530401", districts: generateDefaultDistricts('玉溪') },
      { name: "保山市", code: "530501", districts: generateDefaultDistricts('保山') },
      { name: "昭通市", code: "530601", districts: generateDefaultDistricts('昭通') },
      { name: "丽江市", code: "530701", districts: generateDefaultDistricts('丽江') },
      { name: "普洱市", code: "530801", districts: generateDefaultDistricts('普洱') },
      { name: "临沧市", code: "530901", districts: generateDefaultDistricts('临沧') },
    ]
  },
  {
    name: "贵州省",
    code: "520000",
    cities: [
      { name: "贵阳市", code: "520101", districts: guiyangDistricts },
      { name: "六盘水市", code: "520201", districts: generateDefaultDistricts('六盘水') },
      { name: "遵义市", code: "520301", districts: generateDefaultDistricts('遵义') },
      { name: "安顺市", code: "520401", districts: generateDefaultDistricts('安顺') },
      { name: "毕节市", code: "520501", districts: generateDefaultDistricts('毕节') },
      { name: "铜仁市", code: "520601", districts: generateDefaultDistricts('铜仁') },
      { name: "黔西南布依族苗族自治州", code: "522301", districts: generateDefaultDistricts('黔西南') },
      { name: "黔东南苗族侗族自治州", code: "522601", districts: generateDefaultDistricts('黔东南') },
      { name: "黔南布依族苗族自治州", code: "522701", districts: generateDefaultDistricts('黔南') },
    ]
  },
  {
    name: "广西壮族自治区",
    code: "450000",
    cities: [
      { name: "南宁市", code: "450101", districts: nanningDistricts },
      { name: "柳州市", code: "450201", districts: generateDefaultDistricts('柳州') },
      { name: "桂林市", code: "450301", districts: generateDefaultDistricts('桂林') },
      { name: "梧州市", code: "450401", districts: generateDefaultDistricts('梧州') },
      { name: "北海市", code: "450501", districts: generateDefaultDistricts('北海') },
      { name: "防城港市", code: "450601", districts: generateDefaultDistricts('防城港') },
      { name: "钦州市", code: "450701", districts: generateDefaultDistricts('钦州') },
      { name: "贵港市", code: "450801", districts: generateDefaultDistricts('贵港') },
      { name: "玉林市", code: "450901", districts: generateDefaultDistricts('玉林') },
      { name: "百色市", code: "451001", districts: generateDefaultDistricts('百色') },
      { name: "贺州市", code: "451101", districts: generateDefaultDistricts('贺州') },
      { name: "河池市", code: "451201", districts: generateDefaultDistricts('河池') },
      { name: "来宾市", code: "451301", districts: generateDefaultDistricts('来宾') },
      { name: "崇左市", code: "451401", districts: generateDefaultDistricts('崇左') },
    ]
  },
  {
    name: "黑龙江省",
    code: "230000",
    cities: [
      { name: "哈尔滨市", code: "230101", districts: haerbinDistricts },
      { name: "齐齐哈尔市", code: "230201", districts: generateDefaultDistricts('齐齐哈尔') },
      { name: "鸡西市", code: "230301", districts: generateDefaultDistricts('鸡西') },
      { name: "鹤岗市", code: "230401", districts: generateDefaultDistricts('鹤岗') },
      { name: "双鸭山市", code: "230501", districts: generateDefaultDistricts('双鸭山') },
      { name: "大庆市", code: "230601", districts: generateDefaultDistricts('大庆') },
      { name: "伊春市", code: "230701", districts: generateDefaultDistricts('伊春') },
      { name: "佳木斯市", code: "230801", districts: generateDefaultDistricts('佳木斯') },
      { name: "七台河市", code: "230901", districts: generateDefaultDistricts('七台河') },
      { name: "牡丹江市", code: "231001", districts: generateDefaultDistricts('牡丹江') },
      { name: "黑河市", code: "231101", districts: generateDefaultDistricts('黑河') },
      { name: "绥化市", code: "231201", districts: generateDefaultDistricts('绥化') },
    ]
  },
  {
    name: "吉林省",
    code: "220000",
    cities: [
      { name: "长春市", code: "220101", districts: changchunDistricts },
      { name: "吉林市", code: "220201", districts: generateDefaultDistricts('吉林') },
      { name: "四平市", code: "220301", districts: generateDefaultDistricts('四平') },
      { name: "辽源市", code: "220401", districts: generateDefaultDistricts('辽源') },
      { name: "通化市", code: "220501", districts: generateDefaultDistricts('通化') },
      { name: "白山市", code: "220601", districts: generateDefaultDistricts('白山') },
      { name: "松原市", code: "220701", districts: generateDefaultDistricts('松原') },
      { name: "白城市", code: "220801", districts: generateDefaultDistricts('白城') },
      { name: "延边朝鲜族自治州", code: "222401", districts: generateDefaultDistricts('延边') },
    ]
  },
  {
    name: "河北省",
    code: "130000",
    cities: [
      { name: "石家庄市", code: "130101", districts: shijiazhuangDistricts },
      { name: "唐山市", code: "130201", districts: generateDefaultDistricts('唐山') },
      { name: "秦皇岛市", code: "130301", districts: generateDefaultDistricts('秦皇岛') },
      { name: "邯郸市", code: "130401", districts: generateDefaultDistricts('邯郸') },
      { name: "邢台市", code: "130501", districts: generateDefaultDistricts('邢台') },
      { name: "保定市", code: "130601", districts: generateDefaultDistricts('保定') },
      { name: "张家口市", code: "130701", districts: generateDefaultDistricts('张家口') },
      { name: "承德市", code: "130801", districts: generateDefaultDistricts('承德') },
      { name: "沧州市", code: "130901", districts: generateDefaultDistricts('沧州') },
      { name: "廊坊市", code: "131001", districts: generateDefaultDistricts('廊坊') },
      { name: "衡水市", code: "131101", districts: generateDefaultDistricts('衡水') },
    ]
  },
  {
    name: "山西省",
    code: "140000",
    cities: [
      { name: "太原市", code: "140101", districts: taiyuanDistricts },
      { name: "大同市", code: "140201", districts: generateDefaultDistricts('大同') },
      { name: "阳泉市", code: "140301", districts: generateDefaultDistricts('阳泉') },
      { name: "长治市", code: "140401", districts: generateDefaultDistricts('长治') },
      { name: "晋城市", code: "140501", districts: generateDefaultDistricts('晋城') },
      { name: "朔州市", code: "140601", districts: generateDefaultDistricts('朔州') },
      { name: "晋中市", code: "140701", districts: generateDefaultDistricts('晋中') },
      { name: "运城市", code: "140801", districts: generateDefaultDistricts('运城') },
      { name: "忻州市", code: "140901", districts: generateDefaultDistricts('忻州') },
      { name: "临汾市", code: "141001", districts: generateDefaultDistricts('临汾') },
      { name: "吕梁市", code: "141101", districts: generateDefaultDistricts('吕梁') },
    ]
  },
  {
    name: "内蒙古自治区",
    code: "150000",
    cities: [
      { name: "呼和浩特市", code: "150101", districts: generateDefaultDistricts('呼和浩特') },
      { name: "包头市", code: "150201", districts: generateDefaultDistricts('包头') },
      { name: "乌海市", code: "150301", districts: generateDefaultDistricts('乌海') },
      { name: "赤峰市", code: "150401", districts: generateDefaultDistricts('赤峰') },
      { name: "通辽市", code: "150501", districts: generateDefaultDistricts('通辽') },
      { name: "鄂尔多斯市", code: "150601", districts: generateDefaultDistricts('鄂尔多斯') },
      { name: "呼伦贝尔市", code: "150701", districts: generateDefaultDistricts('呼伦贝尔') },
      { name: "巴彦淖尔市", code: "150801", districts: generateDefaultDistricts('巴彦淖尔') },
      { name: "乌兰察布市", code: "150901", districts: generateDefaultDistricts('乌兰察布') },
    ]
  },
  {
    name: "海南省",
    code: "460000",
    cities: [
      { name: "海口市", code: "460101", districts: generateDefaultDistricts('海口') },
      { name: "三亚市", code: "460201", districts: generateDefaultDistricts('三亚') },
      { name: "三沙市", code: "460301", districts: generateDefaultDistricts('三沙') },
      { name: "儋州市", code: "460401", districts: generateDefaultDistricts('儋州') },
    ]
  },
  {
    name: "甘肃省",
    code: "620000",
    cities: [
      { name: "兰州市", code: "620101", districts: lanzhouDistricts },
      { name: "嘉峪关市", code: "620201", districts: generateDefaultDistricts('嘉峪关') },
      { name: "金昌市", code: "620301", districts: generateDefaultDistricts('金昌') },
      { name: "白银市", code: "620401", districts: generateDefaultDistricts('白银') },
      { name: "天水市", code: "620501", districts: generateDefaultDistricts('天水') },
      { name: "武威市", code: "620601", districts: generateDefaultDistricts('武威') },
      { name: "张掖市", code: "620701", districts: generateDefaultDistricts('张掖') },
      { name: "平凉市", code: "620801", districts: generateDefaultDistricts('平凉') },
      { name: "酒泉市", code: "620901", districts: generateDefaultDistricts('酒泉') },
      { name: "庆阳市", code: "621001", districts: generateDefaultDistricts('庆阳') },
      { name: "定西市", code: "621101", districts: generateDefaultDistricts('定西') },
      { name: "陇南市", code: "621201", districts: generateDefaultDistricts('陇南') },
    ]
  },
  {
    name: "新疆维吾尔自治区",
    code: "650000",
    cities: [
      { name: "乌鲁木齐市", code: "650101", districts: wulumuqiDistricts },
      { name: "克拉玛依市", code: "650201", districts: generateDefaultDistricts('克拉玛依') },
      { name: "吐鲁番市", code: "650401", districts: generateDefaultDistricts('吐鲁番') },
      { name: "哈密市", code: "650501", districts: generateDefaultDistricts('哈密') },
    ]
  },
];

// 获取城市的区域列表
export const getCityDistricts = (cityName: string): District[] => {
  for (const province of chinaProvinces) {
    const city = province.cities.find(c => c.name === cityName);
    if (city) {
      return city.districts;
    }
  }
  return generateDefaultDistricts(cityName);
};
