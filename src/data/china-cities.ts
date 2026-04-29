// 中国省市区数据
export interface City {
  name: string;
  code: string;
}

export interface Province {
  name: string;
  code: string;
  cities: City[];
}

export const chinaProvinces: Province[] = [
  {
    name: "北京市",
    code: "110000",
    cities: [
      { name: "东城区", code: "110101" },
      { name: "西城区", code: "110102" },
      { name: "朝阳区", code: "110105" },
      { name: "丰台区", code: "110106" },
      { name: "石景山区", code: "110107" },
      { name: "海淀区", code: "110108" },
      { name: "通州区", code: "110112" },
      { name: "顺义区", code: "110113" },
      { name: "昌平区", code: "110114" },
      { name: "大兴区", code: "110115" }
    ]
  },
  {
    name: "天津市",
    code: "120000",
    cities: [
      { name: "和平区", code: "120101" },
      { name: "河东区", code: "120102" },
      { name: "河西区", code: "120103" },
      { name: "南开区", code: "120104" },
      { name: "河北区", code: "120105" },
      { name: "红桥区", code: "120106" },
      { name: "滨海新区", code: "120110" },
      { name: "宝坻区", code: "120115" },
      { name: "武清区", code: "120114" },
      { name: "蓟州区", code: "120119" }
    ]
  },
  {
    name: "河北省",
    code: "130000",
    cities: [
      { name: "石家庄市", code: "130101" },
      { name: "唐山市", code: "130201" },
      { name: "秦皇岛市", code: "130301" },
      { name: "邯郸市", code: "130401" },
      { name: "邢台市", code: "130501" },
      { name: "保定市", code: "130601" },
      { name: "张家口市", code: "130701" },
      { name: "承德市", code: "130801" },
      { name: "沧州市", code: "130901" },
      { name: "廊坊市", code: "131001" },
      { name: "衡水市", code: "131101" }
    ]
  },
  {
    name: "山西省",
    code: "140000",
    cities: [
      { name: "太原市", code: "140101" },
      { name: "大同市", code: "140201" },
      { name: "阳泉市", code: "140301" },
      { name: "长治市", code: "140401" },
      { name: "晋城市", code: "140501" },
      { name: "朔州市", code: "140601" },
      { name: "晋中市", code: "140701" },
      { name: "运城市", code: "140801" },
      { name: "忻州市", code: "140901" },
      { name: "临汾市", code: "141001" },
      { name: "吕梁市", code: "141101" }
    ]
  },
  {
    name: "内蒙古自治区",
    code: "150000",
    cities: [
      { name: "呼和浩特市", code: "150101" },
      { name: "包头市", code: "150201" },
      { name: "乌海市", code: "150301" },
      { name: "赤峰市", code: "150401" },
      { name: "通辽市", code: "150501" },
      { name: "鄂尔多斯市", code: "150601" },
      { name: "呼伦贝尔市", code: "150701" },
      { name: "巴彦淖尔市", code: "150801" },
      { name: "乌兰察布市", code: "150901" }
    ]
  },
  {
    name: "辽宁省",
    code: "210000",
    cities: [
      { name: "沈阳市", code: "210101" },
      { name: "大连市", code: "210201" },
      { name: "鞍山市", code: "210301" },
      { name: "抚顺市", code: "210401" },
      { name: "本溪市", code: "210501" },
      { name: "丹东市", code: "210601" },
      { name: "锦州市", code: "210701" },
      { name: "营口市", code: "210801" },
      { name: "阜新市", code: "210901" },
      { name: "辽阳市", code: "211001" },
      { name: "盘锦市", code: "211101" },
      { name: "铁岭市", code: "211201" },
      { name: "朝阳市", code: "211301" },
      { name: "葫芦岛市", code: "211401" }
    ]
  },
  {
    name: "吉林省",
    code: "220000",
    cities: [
      { name: "长春市", code: "220101" },
      { name: "吉林市", code: "220201" },
      { name: "四平市", code: "220301" },
      { name: "辽源市", code: "220401" },
      { name: "通化市", code: "220501" },
      { name: "白山市", code: "220601" },
      { name: "松原市", code: "220701" },
      { name: "白城市", code: "220801" },
      { name: "延边朝鲜族自治州", code: "222401" }
    ]
  },
  {
    name: "黑龙江省",
    code: "230000",
    cities: [
      { name: "哈尔滨市", code: "230101" },
      { name: "齐齐哈尔市", code: "230201" },
      { name: "鸡西市", code: "230301" },
      { name: "鹤岗市", code: "230401" },
      { name: "双鸭山市", code: "230501" },
      { name: "大庆市", code: "230601" },
      { name: "伊春市", code: "230701" },
      { name: "佳木斯市", code: "230801" },
      { name: "七台河市", code: "230901" },
      { name: "牡丹江市", code: "231001" },
      { name: "黑河市", code: "231101" },
      { name: "绥化市", code: "231201" }
    ]
  },
  {
    name: "上海市",
    code: "310000",
    cities: [
      { name: "黄浦区", code: "310101" },
      { name: "徐汇区", code: "310104" },
      { name: "长宁区", code: "310105" },
      { name: "静安区", code: "310106" },
      { name: "普陀区", code: "310107" },
      { name: "虹口区", code: "310109" },
      { name: "杨浦区", code: "310110" },
      { name: "浦东新区", code: "310115" },
      { name: "闵行区", code: "310112" },
      { name: "宝山区", code: "310113" },
      { name: "嘉定区", code: "310114" },
      { name: "松江区", code: "310117" }
    ]
  },
  {
    name: "江苏省",
    code: "320000",
    cities: [
      { name: "南京市", code: "320101" },
      { name: "无锡市", code: "320201" },
      { name: "徐州市", code: "320301" },
      { name: "常州市", code: "320401" },
      { name: "苏州市", code: "320501" },
      { name: "南通市", code: "320601" },
      { name: "连云港市", code: "320701" },
      { name: "淮安市", code: "320801" },
      { name: "盐城市", code: "320901" },
      { name: "扬州市", code: "321001" },
      { name: "镇江市", code: "321101" },
      { name: "泰州市", code: "321201" },
      { name: "宿迁市", code: "321301" }
    ]
  },
  {
    name: "浙江省",
    code: "330000",
    cities: [
      { name: "杭州市", code: "330101" },
      { name: "宁波市", code: "330201" },
      { name: "温州市", code: "330301" },
      { name: "嘉兴市", code: "330401" },
      { name: "湖州市", code: "330501" },
      { name: "绍兴市", code: "330601" },
      { name: "金华市", code: "330701" },
      { name: "衢州市", code: "330801" },
      { name: "舟山市", code: "330901" },
      { name: "台州市", code: "331001" },
      { name: "丽水市", code: "331101" }
    ]
  },
  {
    name: "安徽省",
    code: "340000",
    cities: [
      { name: "合肥市", code: "340101" },
      { name: "芜湖市", code: "340201" },
      { name: "蚌埠市", code: "340301" },
      { name: "淮南市", code: "340401" },
      { name: "马鞍山市", code: "340501" },
      { name: "淮北市", code: "340601" },
      { name: "铜陵市", code: "340701" },
      { name: "安庆市", code: "340801" },
      { name: "黄山市", code: "341001" },
      { name: "滁州市", code: "341101" },
      { name: "阜阳市", code: "341201" },
      { name: "宿州市", code: "341301" },
      { name: "六安市", code: "341501" },
      { name: "亳州市", code: "341601" },
      { name: "池州市", code: "341701" },
      { name: "宣城市", code: "341801" }
    ]
  },
  {
    name: "福建省",
    code: "350000",
    cities: [
      { name: "福州市", code: "350101" },
      { name: "厦门市", code: "350201" },
      { name: "莆田市", code: "350301" },
      { name: "三明市", code: "350401" },
      { name: "泉州市", code: "350501" },
      { name: "漳州市", code: "350601" },
      { name: "南平市", code: "350701" },
      { name: "龙岩市", code: "350801" },
      { name: "宁德市", code: "350901" }
    ]
  },
  {
    name: "江西省",
    code: "360000",
    cities: [
      { name: "南昌市", code: "360101" },
      { name: "景德镇市", code: "360201" },
      { name: "萍乡市", code: "360301" },
      { name: "九江市", code: "360401" },
      { name: "新余市", code: "360501" },
      { name: "鹰潭市", code: "360601" },
      { name: "赣州市", code: "360701" },
      { name: "吉安市", code: "360801" },
      { name: "宜春市", code: "360901" },
      { name: "抚州市", code: "361001" },
      { name: "上饶市", code: "361101" }
    ]
  },
  {
    name: "山东省",
    code: "370000",
    cities: [
      { name: "济南市", code: "370101" },
      { name: "青岛市", code: "370201" },
      { name: "淄博市", code: "370301" },
      { name: "枣庄市", code: "370401" },
      { name: "东营市", code: "370501" },
      { name: "烟台市", code: "370601" },
      { name: "潍坊市", code: "370701" },
      { name: "济宁市", code: "370801" },
      { name: "泰安市", code: "370901" },
      { name: "威海市", code: "371001" },
      { name: "日照市", code: "371101" },
      { name: "临沂市", code: "371301" },
      { name: "德州市", code: "371401" },
      { name: "聊城市", code: "371501" },
      { name: "滨州市", code: "371601" },
      { name: "菏泽市", code: "371701" }
    ]
  },
  {
    name: "河南省",
    code: "410000",
    cities: [
      { name: "郑州市", code: "410101" },
      { name: "开封市", code: "410201" },
      { name: "洛阳市", code: "410301" },
      { name: "平顶山市", code: "410401" },
      { name: "安阳市", code: "410501" },
      { name: "鹤壁市", code: "410601" },
      { name: "新乡市", code: "410701" },
      { name: "焦作市", code: "410801" },
      { name: "濮阳市", code: "410901" },
      { name: "许昌市", code: "411001" },
      { name: "漯河市", code: "411101" },
      { name: "三门峡市", code: "411201" },
      { name: "南阳市", code: "411301" },
      { name: "商丘市", code: "411401" },
      { name: "信阳市", code: "411501" },
      { name: "周口市", code: "411601" },
      { name: "驻马店市", code: "411701" }
    ]
  },
  {
    name: "湖北省",
    code: "420000",
    cities: [
      { name: "武汉市", code: "420101" },
      { name: "黄石市", code: "420201" },
      { name: "十堰市", code: "420301" },
      { name: "宜昌市", code: "420501" },
      { name: "襄阳市", code: "420601" },
      { name: "鄂州市", code: "420701" },
      { name: "荆门市", code: "420801" },
      { name: "孝感市", code: "420901" },
      { name: "荆州市", code: "421001" },
      { name: "黄冈市", code: "421101" },
      { name: "咸宁市", code: "421201" },
      { name: "随州市", code: "421301" },
      { name: "恩施土家族苗族自治州", code: "422801" }
    ]
  },
  {
    name: "湖南省",
    code: "430000",
    cities: [
      { name: "长沙市", code: "430101" },
      { name: "株洲市", code: "430201" },
      { name: "湘潭市", code: "430301" },
      { name: "衡阳市", code: "430401" },
      { name: "邵阳市", code: "430501" },
      { name: "岳阳市", code: "430601" },
      { name: "常德市", code: "430701" },
      { name: "张家界市", code: "430801" },
      { name: "益阳市", code: "430901" },
      { name: "郴州市", code: "431001" },
      { name: "永州市", code: "431101" },
      { name: "怀化市", code: "431201" },
      { name: "娄底市", code: "431301" },
      { name: "湘西土家族苗族自治州", code: "433101" }
    ]
  },
  {
    name: "广东省",
    code: "440000",
    cities: [
      { name: "广州市", code: "440101" },
      { name: "韶关市", code: "440201" },
      { name: "深圳市", code: "440301" },
      { name: "珠海市", code: "440401" },
      { name: "汕头市", code: "440501" },
      { name: "佛山市", code: "440601" },
      { name: "江门市", code: "440701" },
      { name: "湛江市", code: "440801" },
      { name: "茂名市", code: "440901" },
      { name: "肇庆市", code: "441201" },
      { name: "惠州市", code: "441301" },
      { name: "梅州市", code: "441401" },
      { name: "汕尾市", code: "441501" },
      { name: "河源市", code: "441601" },
      { name: "阳江市", code: "441701" },
      { name: "清远市", code: "441801" },
      { name: "东莞市", code: "441901" },
      { name: "中山市", code: "442001" },
      { name: "潮州市", code: "445101" },
      { name: "揭阳市", code: "445201" },
      { name: "云浮市", code: "445301" }
    ]
  },
  {
    name: "广西壮族自治区",
    code: "450000",
    cities: [
      { name: "南宁市", code: "450101" },
      { name: "柳州市", code: "450201" },
      { name: "桂林市", code: "450301" },
      { name: "梧州市", code: "450401" },
      { name: "北海市", code: "450501" },
      { name: "防城港市", code: "450601" },
      { name: "钦州市", code: "450701" },
      { name: "贵港市", code: "450801" },
      { name: "玉林市", code: "450901" },
      { name: "百色市", code: "451001" },
      { name: "贺州市", code: "451101" },
      { name: "河池市", code: "451201" },
      { name: "来宾市", code: "451301" },
      { name: "崇左市", code: "451401" }
    ]
  },
  {
    name: "海南省",
    code: "460000",
    cities: [
      { name: "海口市", code: "460101" },
      { name: "三亚市", code: "460201" },
      { name: "三沙市", code: "460301" },
      { name: "儋州市", code: "460401" }
    ]
  },
  {
    name: "重庆市",
    code: "500000",
    cities: [
      { name: "万州区", code: "500101" },
      { name: "渝中区", code: "500103" },
      { name: "江北区", code: "500105" },
      { name: "沙坪坝区", code: "500106" },
      { name: "九龙坡区", code: "500107" },
      { name: "南岸区", code: "500108" },
      { name: "北碚区", code: "500109" },
      { name: "渝北区", code: "500112" },
      { name: "巴南区", code: "500113" },
      { name: "涪陵区", code: "500102" },
      { name: "长寿区", code: "500115" },
      { name: "璧山区", code: "500120" }
    ]
  },
  {
    name: "四川省",
    code: "510000",
    cities: [
      { name: "成都市", code: "510101" },
      { name: "自贡市", code: "510301" },
      { name: "攀枝花市", code: "510401" },
      { name: "泸州市", code: "510501" },
      { name: "德阳市", code: "510601" },
      { name: "绵阳市", code: "510701" },
      { name: "广元市", code: "510801" },
      { name: "遂宁市", code: "510901" },
      { name: "内江市", code: "511001" },
      { name: "乐山市", code: "511101" },
      { name: "南充市", code: "511301" },
      { name: "眉山市", code: "511401" },
      { name: "宜宾市", code: "511501" },
      { name: "广安市", code: "511601" },
      { name: "达州市", code: "511701" },
      { name: "雅安市", code: "511801" },
      { name: "巴中市", code: "511901" },
      { name: "资阳市", code: "512001" },
      { name: "阿坝藏族羌族自治州", code: "513201" },
      { name: "甘孜藏族自治州", code: "513301" },
      { name: "凉山彝族自治州", code: "513401" }
    ]
  },
  {
    name: "贵州省",
    code: "520000",
    cities: [
      { name: "贵阳市", code: "520101" },
      { name: "六盘水市", code: "520201" },
      { name: "遵义市", code: "520301" },
      { name: "安顺市", code: "520401" },
      { name: "毕节市", code: "520501" },
      { name: "铜仁市", code: "520601" },
      { name: "黔西南布依族苗族自治州", code: "522301" },
      { name: "黔东南苗族侗族自治州", code: "522601" },
      { name: "黔南布依族苗族自治州", code: "522701" }
    ]
  },
  {
    name: "云南省",
    code: "530000",
    cities: [
      { name: "昆明市", code: "530101" },
      { name: "曲靖市", code: "530301" },
      { name: "玉溪市", code: "530401" },
      { name: "保山市", code: "530501" },
      { name: "昭通市", code: "530601" },
      { name: "丽江市", code: "530701" },
      { name: "普洱市", code: "530801" },
      { name: "临沧市", code: "530901" },
      { name: "楚雄彝族自治州", code: "532301" },
      { name: "红河哈尼族彝族自治州", code: "532501" },
      { name: "文山壮族苗族自治州", code: "532601" },
      { name: "西双版纳傣族自治州", code: "532801" },
      { name: "大理白族自治州", code: "532901" },
      { name: "德宏傣族景颇族自治州", code: "533101" },
      { name: "怒江傈僳族自治州", code: "533301" },
      { name: "迪庆藏族自治州", code: "533401" }
    ]
  },
  {
    name: "西藏自治区",
    code: "540000",
    cities: [
      { name: "拉萨市", code: "540101" },
      { name: "日喀则市", code: "540201" },
      { name: "昌都市", code: "540301" },
      { name: "林芝市", code: "540401" },
      { name: "山南市", code: "540501" },
      { name: "那曲市", code: "540601" },
      { name: "阿里地区", code: "542501" }
    ]
  },
  {
    name: "陕西省",
    code: "610000",
    cities: [
      { name: "西安市", code: "610101" },
      { name: "铜川市", code: "610201" },
      { name: "宝鸡市", code: "610301" },
      { name: "咸阳市", code: "610401" },
      { name: "渭南市", code: "610501" },
      { name: "延安市", code: "610601" },
      { name: "汉中市", code: "610701" },
      { name: "榆林市", code: "610801" },
      { name: "安康市", code: "610901" },
      { name: "商洛市", code: "611001" }
    ]
  },
  {
    name: "甘肃省",
    code: "620000",
    cities: [
      { name: "兰州市", code: "620101" },
      { name: "嘉峪关市", code: "620201" },
      { name: "金昌市", code: "620301" },
      { name: "白银市", code: "620401" },
      { name: "天水市", code: "620501" },
      { name: "武威市", code: "620601" },
      { name: "张掖市", code: "620701" },
      { name: "平凉市", code: "620801" },
      { name: "酒泉市", code: "620901" },
      { name: "庆阳市", code: "621001" },
      { name: "定西市", code: "621101" },
      { name: "陇南市", code: "621201" },
      { name: "临夏回族自治州", code: "622901" },
      { name: "甘南藏族自治州", code: "623001" }
    ]
  },
  {
    name: "青海省",
    code: "630000",
    cities: [
      { name: "西宁市", code: "630101" },
      { name: "海东市", code: "630201" },
      { name: "海北藏族自治州", code: "632201" },
      { name: "黄南藏族自治州", code: "632301" },
      { name: "海南藏族自治州", code: "632501" },
      { name: "果洛藏族自治州", code: "632601" },
      { name: "玉树藏族自治州", code: "632701" },
      { name: "海西蒙古族藏族自治州", code: "632801" }
    ]
  },
  {
    name: "宁夏回族自治区",
    code: "640000",
    cities: [
      { name: "银川市", code: "640101" },
      { name: "石嘴山市", code: "640201" },
      { name: "吴忠市", code: "640301" },
      { name: "固原市", code: "640401" },
      { name: "中卫市", code: "640501" }
    ]
  },
  {
    name: "新疆维吾尔自治区",
    code: "650000",
    cities: [
      { name: "乌鲁木齐市", code: "650101" },
      { name: "克拉玛依市", code: "650201" },
      { name: "吐鲁番市", code: "650402" },
      { name: "哈密市", code: "650502" },
      { name: "昌吉回族自治州", code: "652301" },
      { name: "博尔塔拉蒙古自治州", code: "652701" },
      { name: "巴音郭楞蒙古自治州", code: "652801" },
      { name: "阿克苏地区", code: "652901" },
      { name: "克孜勒苏柯尔克孜自治州", code: "653001" },
      { name: "喀什地区", code: "653101" },
      { name: "和田地区", code: "653201" },
      { name: "伊犁哈萨克自治州", code: "654001" },
      { name: "塔城地区", code: "654201" },
      { name: "阿勒泰地区", code: "654301" }
    ]
  },
  {
    name: "台湾省",
    code: "710000",
    cities: [
      { name: "台北市", code: "710101" },
      { name: "新北市", code: "710201" },
      { name: "桃园市", code: "710301" },
      { name: "台中市", code: "710401" },
      { name: "台南市", code: "710501" },
      { name: "高雄市", code: "710601" }
    ]
  },
  {
    name: "香港特别行政区",
    code: "810000",
    cities: [
      { name: "中西区", code: "810101" },
      { name: "东区", code: "810102" },
      { name: "南区", code: "810103" },
      { name: "湾仔区", code: "810104" },
      { name: "九龙城区", code: "810105" },
      { name: "观塘区", code: "810106" },
      { name: "荃湾区", code: "810107" },
      { name: "元朗区", code: "810108" },
      { name: "北区", code: "810109" },
      { name: "大埔区", code: "810110" }
    ]
  },
  {
    name: "澳门特别行政区",
    code: "820000",
    cities: [
      { name: "花地玛堂区", code: "820101" },
      { name: "圣安多尼堂区", code: "820102" },
      { name: "大堂区", code: "820103" },
      { name: "望德堂区", code: "820104" },
      { name: "风顺堂区", code: "820105" },
      { name: "氹仔岛", code: "820106" },
      { name: "路环岛", code: "820107" }
    ]
  }
];
