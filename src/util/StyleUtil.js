class LineHeight{
    static NAME = 'lineHeight';
}

class TextAlign{
    static NAME = 'textAlign';
    static LEFT = {textAlign:'left'};
    static RIGHT = {textAlign:'right'};
    static CENTER = {textAlign:'center'};
    static JUSTIFY = {textAlign:'justify'};
    static INHERIT = {textAlign:'inherit'};
}

/**
 * 这个属性允许对文本设置某种效果，如加下划线。如果后代元素没有自己的装饰，祖先元素上设置的装饰会“延伸”到后代元素中。不要求用户代理支持 blink。
 */
class TextDecoration{
    static NAME = 'textDecoration';

    /**
     * 定义文本上的一条线。
     * @type {{textDecoration: string}}
     */
    static OVERLINE = {textDecoration:'overline'};
    /**
     * 定义穿过文本的一条线。
     * @type {{textDecoration: string}}
     */
    static LINE_THROUGH = {textDecoration:'line-through'};
    /**
     * 定义文本下的一条线。
     * @type {{textDecoration: string}}
     */
    static UNDERLINE = {textDecoration:'underline'};
    /**
     * 默认。定义标准的文本。
     * @type {{textDecoration: string}}
     */
    static NONE = {textDecoration:'none'};
    /**
     * 定义闪烁的文本。
     * @type {{textDecoration: string}}
     */
    static BLINK = {textDecoration:'blink'};
    /**
     * 规定应该从父元素继承 text-decoration 属性的值。
     * @type {{textDecoration: string}}
     */
    static INHERIT = {textDecoration:'inherit'};

}

/**
 * font-weight 属性设置文本的粗细
 */
class FontWeight{
    static NAME = 'fontWeight';

    /**
     * 定义标准的字符
     * @type {{}}
     */
    static NORMAL = {fontWeight : 'normal'};

    /**
     * 定义粗体字符
     * @type {{}}
     */
    static BOLD = {fontWeight : 'bold'};
    /**
     * 定义更粗的字符
     * @type {{}}
     */
    static BOLDER = {fontWeight : 'bolder'};
    /**
     * 定义更细的字符
     * @type {{}}
     */
    static LIGHTER = {fontWeight: 'lighter'};
}

/**
 * font-style 属性定义字体的风格
 */
class FontStyle {
    static NAME = 'fontStyle';

    /**
     * 浏览器显示一个标准的字体样式
     * @type {{}}
     */
    static NORMAL = {fontStyle : 'normal'};

    /**
     * 斜体
     * @type {{}}
     */
    static ITALIC = {fontStyle : 'italic'};

    /**
     * 浏览器会显示一个倾斜的字体样式
     * @type {{}}
     */
    static OBLIQUE = {fontStyle : 'oblique'};

    /**
     * 规定应该从父元素继承字体样式
     * @type {{}}
     */
    static INHERIT = {fontStyle : 'inherit'};
}

/**
 * font-size 属性设置文本的大小
 */
class FontSize {
    static NAME = 'fontSize';

    static XX_SMALL = {fontSize : 'xx-small'};
    static X_SMALL = {fontSize : 'x-small'};
    static SMALL = {fontSize : 'small'};
    static MEDIUM = {fontSize : 'medium'};
    static LARGE = {fontSize : 'large'};
    static X_LARGE = {fontSize : 'x-large'};
    static XX_LARGE = {fontSize : 'xx-large'};

    /**
     * 把 font-size 设置为比父元素更小的尺寸
     * @type {{}}
     */
    static SMALLER = {fontSize : 'smaller'};

    /**
     * 把 font-size 设置为比父元素更大的尺寸
     * @type {{}}
     */
    static LARGER = {fontSize : 'larger'};

    /**
     * 把 font-size 设置为一个固定的值
     * @type {{}}
     */
    static LENGTH = {fontSize : 'length'};

    /**
     * 规定应该从父元素继承字体尺寸
     * @type {{}}
     */
    static INHERIT = {fontSize : 'inherit'};
}

class FontFamily {
    static NAME = 'fontFamily';

    // Windows字体
    /**
     * 宋体
     * @type {{fontFamily: string}}
     */
    static SimSun = {fontFamily:'SimSun'};
    /**
     * 黑体
     * @type {{fontFamily: string}}
     */
    static SimHei = {fontFamily:'SimHei'};
    /**
     * 微软雅黑
     * @type {{fontFamily: string}}
     */
    static MicrosoftYahei	 = {fontFamily:'Microsoft Yahei'};
    /**
     * 微软正黑体
     * @type {{fontFamily: string}}
     */
    static MicrosoftJhengHei = {fontFamily:'Microsoft JhengHei'};
    /**
     * 楷体
     * @type {{fontFamily: string}}
     */
    static KaiTi = {fontFamily:'KaiTi'};
    /**
     * 新宋体
     * @type {{fontFamily: string}}
     */
    static NSimSun = {fontFamily:'NSimSun'};
    /**
     * 仿宋
     * @type {{fontFamily: string}}
     */
    static FangSong = {fontFamily:'FangSong'};

    // Mac 系统
    /**
     * 苹方
     * @type {{fontFamily: string}}
     */
    static PingFangSC = {fontFamily:'PingFang SC'};
    /**
     * 华文黑体
     * @type {{fontFamily: string}}
     */
    static STHeiti = {fontFamily:'STHeiti'};
    /**
     * 华文楷体
     * @type {{fontFamily: string}}
     */
    static STKaiti = {fontFamily:'STKaiti'};
    /**
     * 华文宋体
     * @type {{fontFamily: string}}
     */
    static STSong = {fontFamily:'STSong'};
    /**
     * 华文仿宋
     * @type {{fontFamily: string}}
     */
    static STFangsong = {fontFamily:'STFangsong'};
    /**
     * 华文中宋
     * @type {{fontFamily: string}}
     */
    static STZhongsong = {fontFamily:'STZhongsong'};
    /**
     * 华文琥珀
     * @type {{fontFamily: string}}
     */
    static STHupo = {fontFamily:'STHupo'};
    /**
     * 华文新魏
     * @type {{fontFamily: string}}
     */
    static STXinwei = {fontFamily:'STXinwei'};
    /**
     * 华文隶书
     * @type {{fontFamily: string}}
     */
    static STLiti = {fontFamily:'STLiti'};
    /**
     * 华文行楷
     * @type {{fontFamily: string}}
     */
    static STXingkai = {fontFamily:'STXingkai'};
    /**
     * 冬青黑体简
     * @type {{fontFamily: string}}
     */
    static HiraginoSansGB	 = {fontFamily:'Hiragino Sans GB'};
    /**
     * 兰亭黑-简
     * @type {{fontFamily: string}}
     */
    static LantingheiSC = {fontFamily:'Lantinghei SC'};
    /**
     * 翩翩体-简
     * @type {{fontFamily: string}}
     */
    static HanzipenSC = {fontFamily:'Hanzipen SC'};
    /**
     * 手札体-简
     * @type {{fontFamily: string}}
     */
    static HannotateSC = {fontFamily:'Hannotate SC'};
    /**
     * 宋体-简
     * @type {{fontFamily: string}}
     */
    static SongtiSC = {fontFamily:'Songti SC'};
    /**
     * 娃娃体-简
     * @type {{fontFamily: string}}
     */
    static WawatiSC = {fontFamily:'Wawati SC'};
    /**
     * 魏碑-简
     * @type {{fontFamily: string}}
     */
    static WeibeiSC = {fontFamily:'Weibei SC'};
    /**
     * 行楷-简
     * @type {{fontFamily: string}}
     */
    static XingkaiSC = {fontFamily:'Xingkai SC'};
    /**
     * 雅痞-简
     * @type {{fontFamily: string}}
     */
    static YapiSC = {fontFamily:'Yapi SC'};
    /**
     * 圆体-简
     * @type {{fontFamily: string}}
     */
    static YuantiSC = {fontFamily:'Yuanti SC'};
}

class Color {
    static NAME = 'color';

    /**
     * 规定应该从父元素继承颜色
     * @type {{}}
     */
    static INHERIT = { color : "INHERIT" } ;
    static AliceBlue = { color : "AliceBlue" } ;
    static AntiqueWhite = { color : "AntiqueWhite" } ;
    static Aqua = { color : "Aqua" } ;
    static Aquamarine = { color : "Aquamarine" } ;
    static Azure = { color : "Azure" } ;
    static Beige = { color : "Beige" } ;
    static Bisque = { color : "Bisque" } ;
    static Black = { color : "Black" } ;
    static BlanchedAlmond = { color : "BlanchedAlmond" } ;
    static Blue = { color : "Blue" } ;
    static BlueViolet = { color : "BlueViolet" } ;
    static Brown = { color : "Brown" } ;
    static BurlyWood = { color : "BurlyWood" } ;
    static CadetBlue = { color : "CadetBlue" } ;
    static Chartreuse = { color : "Chartreuse" } ;
    static Chocolate = { color : "Chocolate" } ;
    static Coral = { color : "Coral" } ;
    static CornflowerBlue = { color : "CornflowerBlue" } ;
    static Cornsilk = { color : "Cornsilk" } ;
    static Crimson = { color : "Crimson" } ;
    static Cyan = { color : "Cyan" } ;
    static DarkBlue = { color : "DarkBlue" } ;
    static DarkCyan = { color : "DarkCyan" } ;
    static DarkGoldenRod = { color : "DarkGoldenRod" } ;
    static DarkGray = { color : "DarkGray" } ;
    static DarkGreen = { color : "DarkGreen" } ;
    static DarkKhaki = { color : "DarkKhaki" } ;
    static DarkMagenta = { color : "DarkMagenta" } ;
    static DarkOliveGreen = { color : "DarkOliveGreen" } ;
    static Darkorange = { color : "Darkorange" } ;
    static DarkOrchid = { color : "DarkOrchid" } ;
    static DarkRed = { color : "DarkRed" } ;
    static DarkSalmon = { color : "DarkSalmon" } ;
    static DarkSeaGreen = { color : "DarkSeaGreen" } ;
    static DarkSlateBlue = { color : "DarkSlateBlue" } ;
    static DarkSlateGray = { color : "DarkSlateGray" } ;
    static DarkTurquoise = { color : "DarkTurquoise" } ;
    static DarkViolet = { color : "DarkViolet" } ;
    static DeepPink = { color : "DeepPink" } ;
    static DeepSkyBlue = { color : "DeepSkyBlue" } ;
    static DimGray = { color : "DimGray" } ;
    static DodgerBlue = { color : "DodgerBlue" } ;
    static Feldspar = { color : "Feldspar" } ;
    static FireBrick = { color : "FireBrick" } ;
    static FloralWhite = { color : "FloralWhite" } ;
    static ForestGreen = { color : "ForestGreen" } ;
    static Fuchsia = { color : "Fuchsia" } ;
    static Gainsboro = { color : "Gainsboro" } ;
    static GhostWhite = { color : "GhostWhite" } ;
    static Gold = { color : "Gold" } ;
    static GoldenRod = { color : "GoldenRod" } ;
    static Gray = { color : "Gray" } ;
    static Green = { color : "Green" } ;
    static GreenYellow = { color : "GreenYellow" } ;
    static HoneyDew = { color : "HoneyDew" } ;
    static HotPink = { color : "HotPink" } ;
    static IndianRed = { color : "IndianRed" } ;
    static Indigo = { color : "Indigo" } ;
    static Ivory = { color : "Ivory" } ;
    static Khaki = { color : "Khaki" } ;
    static Lavender = { color : "Lavender" } ;
    static LavenderBlush = { color : "LavenderBlush" } ;
    static LawnGreen = { color : "LawnGreen" } ;
    static LemonChiffon = { color : "LemonChiffon" } ;
    static LightBlue = { color : "LightBlue" } ;
    static LightCoral = { color : "LightCoral" } ;
    static LightCyan = { color : "LightCyan" } ;
    static LightGoldenRodYellow = { color : "LightGoldenRodYellow" } ;
    static LightGrey = { color : "LightGrey" } ;
    static LightGreen = { color : "LightGreen" } ;
    static LightPink = { color : "LightPink" } ;
    static LightSalmon = { color : "LightSalmon" } ;
    static LightSeaGreen = { color : "LightSeaGreen" } ;
    static LightSkyBlue = { color : "LightSkyBlue" } ;
    static LightSlateBlue = { color : "LightSlateBlue" } ;
    static LightSlateGray = { color : "LightSlateGray" } ;
    static LightSteelBlue = { color : "LightSteelBlue" } ;
    static LightYellow = { color : "LightYellow" } ;
    static Lime = { color : "Lime" } ;
    static LimeGreen = { color : "LimeGreen" } ;
    static Linen = { color : "Linen" } ;
    static Magenta = { color : "Magenta" } ;
    static Maroon = { color : "Maroon" } ;
    static MediumAquaMarine = { color : "MediumAquaMarine" } ;
    static MediumBlue = { color : "MediumBlue" } ;
    static MediumOrchid = { color : "MediumOrchid" } ;
    static MediumPurple = { color : "MediumPurple" } ;
    static MediumSeaGreen = { color : "MediumSeaGreen" } ;
    static MediumSlateBlue = { color : "MediumSlateBlue" } ;
    static MediumSpringGreen = { color : "MediumSpringGreen" } ;
    static MediumTurquoise = { color : "MediumTurquoise" } ;
    static MediumVioletRed = { color : "MediumVioletRed" } ;
    static MidnightBlue = { color : "MidnightBlue" } ;
    static MintCream = { color : "MintCream" } ;
    static MistyRose = { color : "MistyRose" } ;
    static Moccasin = { color : "Moccasin" } ;
    static NavajoWhite = { color : "NavajoWhite" } ;
    static Navy = { color : "Navy" } ;
    static OldLace = { color : "OldLace" } ;
    static Olive = { color : "Olive" } ;
    static OliveDrab = { color : "OliveDrab" } ;
    static Orange = { color : "Orange" } ;
    static OrangeRed = { color : "OrangeRed" } ;
    static Orchid = { color : "Orchid" } ;
    static PaleGoldenRod = { color : "PaleGoldenRod" } ;
    static PaleGreen = { color : "PaleGreen" } ;
    static PaleTurquoise = { color : "PaleTurquoise" } ;
    static PaleVioletRed = { color : "PaleVioletRed" } ;
    static PapayaWhip = { color : "PapayaWhip" } ;
    static PeachPuff = { color : "PeachPuff" } ;
    static Peru = { color : "Peru" } ;
    static Pink = { color : "Pink" } ;
    static Plum = { color : "Plum" } ;
    static PowderBlue = { color : "PowderBlue" } ;
    static Purple = { color : "Purple" } ;
    static Red = { color : "Red" } ;
    static RosyBrown = { color : "RosyBrown" } ;
    static RoyalBlue = { color : "RoyalBlue" } ;
    static SaddleBrown = { color : "SaddleBrown" } ;
    static Salmon = { color : "Salmon" } ;
    static SandyBrown = { color : "SandyBrown" } ;
    static SeaGreen = { color : "SeaGreen" } ;
    static SeaShell = { color : "SeaShell" } ;
    static Sienna = { color : "Sienna" } ;
    static Silver = { color : "Silver" } ;
    static SkyBlue = { color : "SkyBlue" } ;
    static SlateBlue = { color : "SlateBlue" } ;
    static SlateGray = { color : "SlateGray" } ;
    static Snow = { color : "Snow" } ;
    static SpringGreen = { color : "SpringGreen" } ;
    static SteelBlue = { color : "SteelBlue" } ;
    static Tan = { color : "Tan" } ;
    static Teal = { color : "Teal" } ;
    static Thistle = { color : "Thistle" } ;
    static Tomato = { color : "Tomato" } ;
    static Turquoise = { color : "Turquoise" } ;
    static Violet = { color : "Violet" } ;
    static VioletRed = { color : "VioletRed" } ;
    static Wheat = { color : "Wheat" } ;
    static White = { color : "White" } ;
    static WhiteSmoke = { color : "WhiteSmoke" } ;
    static Yellow = { color : "Yellow" } ;
    static YellowGreen = { color : "YellowGreen" } ;
}

class BackgroundColor{
    static NAME = 'backgroundColor';

    static INHERIT = { backgroundColor : "INHERIT" } ;
    static AliceBlue = { backgroundColor : "AliceBlue" } ;
    static AntiqueWhite = { backgroundColor : "AntiqueWhite" } ;
    static Aqua = { backgroundColor : "Aqua" } ;
    static Aquamarine = { backgroundColor : "Aquamarine" } ;
    static Azure = { backgroundColor : "Azure" } ;
    static Beige = { backgroundColor : "Beige" } ;
    static Bisque = { backgroundColor : "Bisque" } ;
    static Black = { backgroundColor : "Black" } ;
    static BlanchedAlmond = { backgroundColor : "BlanchedAlmond" } ;
    static Blue = { backgroundColor : "Blue" } ;
    static BlueViolet = { backgroundColor : "BlueViolet" } ;
    static Brown = { backgroundColor : "Brown" } ;
    static BurlyWood = { backgroundColor : "BurlyWood" } ;
    static CadetBlue = { backgroundColor : "CadetBlue" } ;
    static Chartreuse = { backgroundColor : "Chartreuse" } ;
    static Chocolate = { backgroundColor : "Chocolate" } ;
    static Coral = { backgroundColor : "Coral" } ;
    static CornflowerBlue = { backgroundColor : "CornflowerBlue" } ;
    static Cornsilk = { backgroundColor : "Cornsilk" } ;
    static Crimson = { backgroundColor : "Crimson" } ;
    static Cyan = { backgroundColor : "Cyan" } ;
    static DarkBlue = { backgroundColor : "DarkBlue" } ;
    static DarkCyan = { backgroundColor : "DarkCyan" } ;
    static DarkGoldenRod = { backgroundColor : "DarkGoldenRod" } ;
    static DarkGray = { backgroundColor : "DarkGray" } ;
    static DarkGreen = { backgroundColor : "DarkGreen" } ;
    static DarkKhaki = { backgroundColor : "DarkKhaki" } ;
    static DarkMagenta = { backgroundColor : "DarkMagenta" } ;
    static DarkOliveGreen = { backgroundColor : "DarkOliveGreen" } ;
    static Darkorange = { backgroundColor : "Darkorange" } ;
    static DarkOrchid = { backgroundColor : "DarkOrchid" } ;
    static DarkRed = { backgroundColor : "DarkRed" } ;
    static DarkSalmon = { backgroundColor : "DarkSalmon" } ;
    static DarkSeaGreen = { backgroundColor : "DarkSeaGreen" } ;
    static DarkSlateBlue = { backgroundColor : "DarkSlateBlue" } ;
    static DarkSlateGray = { backgroundColor : "DarkSlateGray" } ;
    static DarkTurquoise = { backgroundColor : "DarkTurquoise" } ;
    static DarkViolet = { backgroundColor : "DarkViolet" } ;
    static DeepPink = { backgroundColor : "DeepPink" } ;
    static DeepSkyBlue = { backgroundColor : "DeepSkyBlue" } ;
    static DimGray = { backgroundColor : "DimGray" } ;
    static DodgerBlue = { backgroundColor : "DodgerBlue" } ;
    static Feldspar = { backgroundColor : "Feldspar" } ;
    static FireBrick = { backgroundColor : "FireBrick" } ;
    static FloralWhite = { backgroundColor : "FloralWhite" } ;
    static ForestGreen = { backgroundColor : "ForestGreen" } ;
    static Fuchsia = { backgroundColor : "Fuchsia" } ;
    static Gainsboro = { backgroundColor : "Gainsboro" } ;
    static GhostWhite = { backgroundColor : "GhostWhite" } ;
    static Gold = { backgroundColor : "Gold" } ;
    static GoldenRod = { backgroundColor : "GoldenRod" } ;
    static Gray = { backgroundColor : "Gray" } ;
    static Green = { backgroundColor : "Green" } ;
    static GreenYellow = { backgroundColor : "GreenYellow" } ;
    static HoneyDew = { backgroundColor : "HoneyDew" } ;
    static HotPink = { backgroundColor : "HotPink" } ;
    static IndianRed = { backgroundColor : "IndianRed" } ;
    static Indigo = { backgroundColor : "Indigo" } ;
    static Ivory = { backgroundColor : "Ivory" } ;
    static Khaki = { backgroundColor : "Khaki" } ;
    static Lavender = { backgroundColor : "Lavender" } ;
    static LavenderBlush = { backgroundColor : "LavenderBlush" } ;
    static LawnGreen = { backgroundColor : "LawnGreen" } ;
    static LemonChiffon = { backgroundColor : "LemonChiffon" } ;
    static LightBlue = { backgroundColor : "LightBlue" } ;
    static LightCoral = { backgroundColor : "LightCoral" } ;
    static LightCyan = { backgroundColor : "LightCyan" } ;
    static LightGoldenRodYellow = { backgroundColor : "LightGoldenRodYellow" } ;
    static LightGrey = { backgroundColor : "LightGrey" } ;
    static LightGreen = { backgroundColor : "LightGreen" } ;
    static LightPink = { backgroundColor : "LightPink" } ;
    static LightSalmon = { backgroundColor : "LightSalmon" } ;
    static LightSeaGreen = { backgroundColor : "LightSeaGreen" } ;
    static LightSkyBlue = { backgroundColor : "LightSkyBlue" } ;
    static LightSlateBlue = { backgroundColor : "LightSlateBlue" } ;
    static LightSlateGray = { backgroundColor : "LightSlateGray" } ;
    static LightSteelBlue = { backgroundColor : "LightSteelBlue" } ;
    static LightYellow = { backgroundColor : "LightYellow" } ;
    static Lime = { backgroundColor : "Lime" } ;
    static LimeGreen = { backgroundColor : "LimeGreen" } ;
    static Linen = { backgroundColor : "Linen" } ;
    static Magenta = { backgroundColor : "Magenta" } ;
    static Maroon = { backgroundColor : "Maroon" } ;
    static MediumAquaMarine = { backgroundColor : "MediumAquaMarine" } ;
    static MediumBlue = { backgroundColor : "MediumBlue" } ;
    static MediumOrchid = { backgroundColor : "MediumOrchid" } ;
    static MediumPurple = { backgroundColor : "MediumPurple" } ;
    static MediumSeaGreen = { backgroundColor : "MediumSeaGreen" } ;
    static MediumSlateBlue = { backgroundColor : "MediumSlateBlue" } ;
    static MediumSpringGreen = { backgroundColor : "MediumSpringGreen" } ;
    static MediumTurquoise = { backgroundColor : "MediumTurquoise" } ;
    static MediumVioletRed = { backgroundColor : "MediumVioletRed" } ;
    static MidnightBlue = { backgroundColor : "MidnightBlue" } ;
    static MintCream = { backgroundColor : "MintCream" } ;
    static MistyRose = { backgroundColor : "MistyRose" } ;
    static Moccasin = { backgroundColor : "Moccasin" } ;
    static NavajoWhite = { backgroundColor : "NavajoWhite" } ;
    static Navy = { backgroundColor : "Navy" } ;
    static OldLace = { backgroundColor : "OldLace" } ;
    static Olive = { backgroundColor : "Olive" } ;
    static OliveDrab = { backgroundColor : "OliveDrab" } ;
    static Orange = { backgroundColor : "Orange" } ;
    static OrangeRed = { backgroundColor : "OrangeRed" } ;
    static Orchid = { backgroundColor : "Orchid" } ;
    static PaleGoldenRod = { backgroundColor : "PaleGoldenRod" } ;
    static PaleGreen = { backgroundColor : "PaleGreen" } ;
    static PaleTurquoise = { backgroundColor : "PaleTurquoise" } ;
    static PaleVioletRed = { backgroundColor : "PaleVioletRed" } ;
    static PapayaWhip = { backgroundColor : "PapayaWhip" } ;
    static PeachPuff = { backgroundColor : "PeachPuff" } ;
    static Peru = { backgroundColor : "Peru" } ;
    static Pink = { backgroundColor : "Pink" } ;
    static Plum = { backgroundColor : "Plum" } ;
    static PowderBlue = { backgroundColor : "PowderBlue" } ;
    static Purple = { backgroundColor : "Purple" } ;
    static Red = { backgroundColor : "Red" } ;
    static RosyBrown = { backgroundColor : "RosyBrown" } ;
    static RoyalBlue = { backgroundColor : "RoyalBlue" } ;
    static SaddleBrown = { backgroundColor : "SaddleBrown" } ;
    static Salmon = { backgroundColor : "Salmon" } ;
    static SandyBrown = { backgroundColor : "SandyBrown" } ;
    static SeaGreen = { backgroundColor : "SeaGreen" } ;
    static SeaShell = { backgroundColor : "SeaShell" } ;
    static Sienna = { backgroundColor : "Sienna" } ;
    static Silver = { backgroundColor : "Silver" } ;
    static SkyBlue = { backgroundColor : "SkyBlue" } ;
    static SlateBlue = { backgroundColor : "SlateBlue" } ;
    static SlateGray = { backgroundColor : "SlateGray" } ;
    static Snow = { backgroundColor : "Snow" } ;
    static SpringGreen = { backgroundColor : "SpringGreen" } ;
    static SteelBlue = { backgroundColor : "SteelBlue" } ;
    static Tan = { backgroundColor : "Tan" } ;
    static Teal = { backgroundColor : "Teal" } ;
    static Thistle = { backgroundColor : "Thistle" } ;
    static Tomato = { backgroundColor : "Tomato" } ;
    static Turquoise = { backgroundColor : "Turquoise" } ;
    static Violet = { backgroundColor : "Violet" } ;
    static VioletRed = { backgroundColor : "VioletRed" } ;
    static Wheat = { backgroundColor : "Wheat" } ;
    static White = { backgroundColor : "White" } ;
    static WhiteSmoke = { backgroundColor : "WhiteSmoke" } ;
    static Yellow = { backgroundColor : "Yellow" } ;
    static YellowGreen = { backgroundColor : "YellowGreen" } ;
}


export {LineHeight, TextAlign, TextDecoration, FontFamily, Color, BackgroundColor, FontSize, FontStyle, FontWeight};