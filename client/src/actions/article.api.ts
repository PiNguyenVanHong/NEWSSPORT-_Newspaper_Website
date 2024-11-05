import {
  ARTICLE_ROUTES,
  HeaderConfig,
  requestClient,
} from "@/actions/api.route";
import { getToken } from "@/lib/utils";
import { ArticleRequest } from "@/types/article.type";

const rootData = {
  status: "success",
  totalResults: 35,
  results: [
    {
      article_id: "ec3fe41a94d351acd816e4494f9b8ebc",
      title: "Opening doors to new possibilities for young learners",
      link: "https://www.channelnewsasia.com/advertorial/opening-doors-new-possibilities-young-learners-4656291",
      keywords: ["advertorial"],
      creator: null,
      video_url: null,
      description:
        "Through NTUC First Campus’ Bright Horizons Fund, preschoolers from low-income families are given the chance to grow and thrive.",
      content: "ONLY AVAILABLE IN PAID PLANS",
      pubDate: "2024-10-28 00:25:55",
      pubDateTZ: "UTC",
      image_url:
        "https://onecms-res.cloudinary.com/image/upload/s--AzqDM5tK--/f_auto,q_auto/c_fill,g_auto,h_468,w_830/v1/mediacorp/cna/image/2024/10/03/bstudio_ntuc_first_campus_bright_horizons_fund.jpg?itok=XkMXZbDJ",
      source_id: "channelnewsasia",
      source_priority: 37829,
      source_name: "Cna",
      source_url: "https://www.channelnewsasia.com",
      source_icon: "https://i.bytvi.com/domain_icons/channelnewsasia.jpg",
      language: "english",
      country: [
        "georgia",
        "yemen",
        "afghanistan",
        "cyprus",
        "india",
        "singapore",
        "saudi arabia",
        "maldives",
        "japan",
        "united arab emirates",
        "malaysia",
        "china",
        "south korea",
        "north korea",
        "taiwan",
        "thailand",
        "pakistan",
        "mongolia",
        "brunei",
        "lebanon",
        "indonesia",
        "kyrgyzstan",
        "syria",
        "israel",
        "bhutan",
        "iran",
        "turkey",
        "armenia",
        "qatar",
        "philippines",
        "hong kong",
        "kazakhstan",
        "iraq",
        "bangladesh",
        "laos",
        "vietnam",
        "timor-leste",
        "kuwait",
        "myanmar",
        "azerbaijan",
        "jordan",
        "nepal",
        "sri lanka",
        "uzbekistan",
        "turkmenistan",
        "macau",
        "bahrain",
        "cambodia",
        "tajikistan",
        "oman",
      ],
      category: ["top"],
      ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
      ai_org: "ONLY AVAILABLE IN CORPORATE PLANS",
      duplicate: false,
    },
    {
      article_id: "9f1b10f109d61f8a9ec4f942fec77d5f",
      title:
        "Chuyển nhượng 28/10: Real Madrid nhắm sao 110 triệu Euro của PSG, Van Dijk báo tin buồn về hợp đồng",
      link: "https://thethao247.vn/461-chuyen-nhuong-28-10-real-madrid-nham-sao-110-trieu-euro-cua-psg-van-dijk-bao-tin-buon-ve-hop-dong-d346395.html",
      keywords: null,
      creator: ["Thethao247"],
      video_url: null,
      description:
        "Real Madrid theo đuổi sao PSG giá 110 triệu Euro hay việc Van Dijk báo tin buồn về hợp đồng với Liverpool... sẽ là những tin tức chính trong bản tin chuyển nhượng mới nhất hôm nay 28/10.",
      content: "ONLY AVAILABLE IN PAID PLANS",
      pubDate: "2024-10-27 23:41:00",
      pubDateTZ: "UTC",
      image_url:
        "https://cdn-img.thethao247.vn/resize_360x230/storage/files/btvttqt4/2024/10/28/3-671ed96116e0d.jpg",
      source_id: "thethao247",
      source_priority: 77079,
      source_name: "Thể Thao 247",
      source_url: "https://thethao247.vn",
      source_icon: "https://i.bytvi.com/domain_icons/thethao247.png",
      language: "vietnamese",
      country: ["vietnam"],
      category: ["sports"],
      ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
      ai_org: "ONLY AVAILABLE IN CORPORATE PLANS",
      duplicate: false,
    },
    {
      article_id: "d49ee2baa49532ca685279d5050ea860",
      title: "Aussies: Win an Epic EA SPORTS FCTM 25 Prize Pack",
      link: "https://sea.ign.com/ea-sports-fc-25/221973/feature/aussies-win-an-epic-ea-sports-fctm-25-prize-pack",
      keywords: ["feature", "ea sports fc 25"],
      creator: ["Ign Au Staff"],
      video_url: null,
      description:
        "Boost your gaming setup and start scoring goals like a pro!Uber One is teaming up with IGN to launch an epic giveaway to help budding EA SPORTS FCTM 25 players who are Uber One members improve their game on the pitch. Thanks to Uber One, three Uber One members have a chance to win an EA SPORTS ...",
      content: "ONLY AVAILABLE IN PAID PLANS",
      pubDate: "2024-10-27 22:51:38",
      pubDateTZ: "UTC",
      image_url:
        "https://sm.ign.com/ign_ap/feature/a/aussies-wi/aussies-win-an-epic-ea-sports-fctm-25-prize-pack_y2wg.jpg",
      source_id: "ign",
      source_priority: 144,
      source_name: "Ign Southeast Asia",
      source_url: "https://sea.ign.com",
      source_icon: "https://i.bytvi.com/domain_icons/ign.png",
      language: "english",
      country: [
        "vietnam",
        "singapore",
        "malaysia",
        "myanmar",
        "philippines",
        "thailand",
        "brunei",
        "indonesia",
        "cambodia",
      ],
      category: ["top"],
      ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
      ai_org: "ONLY AVAILABLE IN CORPORATE PLANS",
      duplicate: true,
    },
    {
      article_id: "6b10443408636500b26db6fd3cf6f96d",
      title: "Arteta rues more injury additions after Liverpool draw",
      link: "https://www.channelnewsasia.com/sport/arteta-rues-more-injury-additions-after-liverpool-draw-4706266",
      keywords: ["sport"],
      creator: null,
      video_url: null,
      description: null,
      content: "ONLY AVAILABLE IN PAID PLANS",
      pubDate: "2024-10-27 21:19:25",
      pubDateTZ: "UTC",
      image_url:
        "https://onecms-res.cloudinary.com/image/upload/s--sH4CLKRR--/fl_relative,g_south_east,l_mediacorp:cna:watermark:2024-04:reuters_1,w_0.1/f_auto,q_auto/c_fill,g_auto,h_468,w_830/v1/one-cms/core/2024-10-27t211925z_1_lynxmpek9q09x_rtroptp_3_soccer-england-ars-liv-report.jpg?itok=XNlXxCum",
      source_id: "channelnewsasia",
      source_priority: 37829,
      source_name: "Cna",
      source_url: "https://www.channelnewsasia.com",
      source_icon: "https://i.bytvi.com/domain_icons/channelnewsasia.jpg",
      language: "english",
      country: [
        "singapore",
        "georgia",
        "yemen",
        "afghanistan",
        "cyprus",
        "india",
        "saudi arabia",
        "maldives",
        "japan",
        "united arab emirates",
        "malaysia",
        "china",
        "south korea",
        "north korea",
        "taiwan",
        "thailand",
        "pakistan",
        "mongolia",
        "brunei",
        "lebanon",
        "indonesia",
        "kyrgyzstan",
        "syria",
        "israel",
        "bhutan",
        "iran",
        "turkey",
        "armenia",
        "qatar",
        "philippines",
        "hong kong",
        "kazakhstan",
        "iraq",
        "bangladesh",
        "laos",
        "vietnam",
        "timor-leste",
        "kuwait",
        "myanmar",
        "azerbaijan",
        "jordan",
        "nepal",
        "oman",
        "sri lanka",
        "uzbekistan",
        "turkmenistan",
        "macau",
        "bahrain",
        "cambodia",
        "tajikistan",
      ],
      category: ["sports"],
      ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
      ai_org: "ONLY AVAILABLE IN CORPORATE PLANS",
      duplicate: false,
    },
    {
      article_id: "00f3d54608da307f173e68ee2fd3e028",
      title:
        "Inzaghi frustrated by Inter's missed chances and defensive errors in Juve draw",
      link: "https://www.channelnewsasia.com/sport/inzaghi-frustrated-inters-missed-chances-and-defensive-errors-juve-draw-4706256",
      keywords: ["sport"],
      creator: null,
      video_url: null,
      description: null,
      content: "ONLY AVAILABLE IN PAID PLANS",
      pubDate: "2024-10-27 21:05:47",
      pubDateTZ: "UTC",
      image_url:
        "https://onecms-res.cloudinary.com/image/upload/s--90f4nRD9--/fl_relative,g_south_east,l_mediacorp:cna:watermark:2024-04:reuters_1,w_0.1/f_auto,q_auto/c_fill,g_auto,h_468,w_830/v1/one-cms/core/2024-10-27t210547z_1_lynxmpek9q09t_rtroptp_3_soccer-italy-int-juv-report.jpg?itok=8aPakYmA",
      source_id: "channelnewsasia",
      source_priority: 37829,
      source_name: "Cna",
      source_url: "https://www.channelnewsasia.com",
      source_icon: "https://i.bytvi.com/domain_icons/channelnewsasia.jpg",
      language: "english",
      country: [
        "georgia",
        "yemen",
        "afghanistan",
        "cyprus",
        "india",
        "singapore",
        "saudi arabia",
        "maldives",
        "japan",
        "united arab emirates",
        "malaysia",
        "china",
        "south korea",
        "north korea",
        "taiwan",
        "thailand",
        "pakistan",
        "mongolia",
        "brunei",
        "lebanon",
        "indonesia",
        "kyrgyzstan",
        "syria",
        "israel",
        "bhutan",
        "iran",
        "turkey",
        "armenia",
        "qatar",
        "philippines",
        "hong kong",
        "kazakhstan",
        "iraq",
        "bangladesh",
        "laos",
        "vietnam",
        "timor-leste",
        "kuwait",
        "myanmar",
        "azerbaijan",
        "jordan",
        "nepal",
        "sri lanka",
        "uzbekistan",
        "turkmenistan",
        "macau",
        "bahrain",
        "cambodia",
        "tajikistan",
        "oman",
      ],
      category: ["top"],
      ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
      ai_org: "ONLY AVAILABLE IN CORPORATE PLANS",
      duplicate: false,
    },
    {
      article_id: "339aa9eb2f37c0f65384def86cc3a64e",
      title: "Trump back in New York as Harris targets grassroots",
      link: "https://www.channelnewsasia.com/world/trump-back-new-york-harris-targets-grassroots-4706166",
      keywords: ["world"],
      creator: null,
      video_url: null,
      description: null,
      content: "ONLY AVAILABLE IN PAID PLANS",
      pubDate: "2024-10-27 20:11:00",
      pubDateTZ: "UTC",
      image_url:
        "https://onecms-res.cloudinary.com/image/upload/s--my93HQcq--/fl_relative,g_south_east,l_one-cms:core:watermark:ap_data-1,w_0.1/f_auto,q_auto/c_fill,g_auto,h_468,w_830/v1/one-cms/core/election_2024_trump_25065.jpg?itok=iEnH8vzG",
      source_id: "channelnewsasia",
      source_priority: 37829,
      source_name: "Cna",
      source_url: "https://www.channelnewsasia.com",
      source_icon: "https://i.bytvi.com/domain_icons/channelnewsasia.jpg",
      language: "english",
      country: [
        "georgia",
        "yemen",
        "afghanistan",
        "cyprus",
        "india",
        "singapore",
        "saudi arabia",
        "maldives",
        "japan",
        "united arab emirates",
        "malaysia",
        "china",
        "south korea",
        "north korea",
        "taiwan",
        "thailand",
        "pakistan",
        "mongolia",
        "brunei",
        "lebanon",
        "indonesia",
        "kyrgyzstan",
        "syria",
        "israel",
        "bhutan",
        "iran",
        "turkey",
        "armenia",
        "qatar",
        "philippines",
        "hong kong",
        "kazakhstan",
        "iraq",
        "bangladesh",
        "laos",
        "vietnam",
        "timor-leste",
        "kuwait",
        "myanmar",
        "azerbaijan",
        "jordan",
        "nepal",
        "sri lanka",
        "uzbekistan",
        "turkmenistan",
        "macau",
        "bahrain",
        "cambodia",
        "tajikistan",
      ],
      category: ["world"],
      ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
      ai_org: "ONLY AVAILABLE IN CORPORATE PLANS",
      duplicate: true,
    },
    {
      article_id: "b554b4251ddb7b0021b9a2f178e4354a",
      title: "Hall of Fame Series headed to Allegiant Stadium in '27",
      link: "https://www.channelnewsasia.com/sport/hall-fame-series-headed-allegiant-stadium-27-4706201",
      keywords: ["sport"],
      creator: null,
      video_url: null,
      description: null,
      content: "ONLY AVAILABLE IN PAID PLANS",
      pubDate: "2024-10-27 20:10:00",
      pubDateTZ: "UTC",
      image_url:
        "https://onecms-res.cloudinary.com/image/upload/s--HDaqaVtj--/fl_relative,g_south_east,l_mediacorp:cna:watermark:2024-04:reuters_1,w_0.1/f_auto,q_auto/c_fill,g_auto,h_468,w_830/v1/one-cms/core/2024-10-27t201000z_1_lynxmpek9q09n_rtroptp_3_football-nfl-oak-kc.jpg?itok=oKyJvOXp",
      source_id: "channelnewsasia",
      source_priority: 37829,
      source_name: "Cna",
      source_url: "https://www.channelnewsasia.com",
      source_icon: "https://i.bytvi.com/domain_icons/channelnewsasia.jpg",
      language: "english",
      country: [
        "singapore",
        "georgia",
        "yemen",
        "afghanistan",
        "cyprus",
        "india",
        "saudi arabia",
        "maldives",
        "japan",
        "united arab emirates",
        "malaysia",
        "china",
        "south korea",
        "north korea",
        "taiwan",
        "thailand",
        "pakistan",
        "mongolia",
        "brunei",
        "lebanon",
        "indonesia",
        "kyrgyzstan",
        "syria",
        "israel",
        "bhutan",
        "iran",
        "turkey",
        "armenia",
        "qatar",
        "philippines",
        "hong kong",
        "kazakhstan",
        "iraq",
        "bangladesh",
        "laos",
        "vietnam",
        "timor-leste",
        "kuwait",
        "myanmar",
        "azerbaijan",
        "jordan",
        "nepal",
        "oman",
        "sri lanka",
        "uzbekistan",
        "turkmenistan",
        "macau",
        "bahrain",
        "cambodia",
        "tajikistan",
      ],
      category: ["sports"],
      ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
      ai_org: "ONLY AVAILABLE IN CORPORATE PLANS",
      duplicate: true,
    },
    {
      article_id: "325ae3441f7c59ff7b04bc2c93861abe",
      title:
        "BJP MP Tejasvi Surya Finishes 'Daunting' Ironman Challenge In Goa, PM Modi Says 'Commendable Feat'",
      link: "https://menafn.com/1108822628/BJP-MP-Tejasvi-Surya-Finishes-Daunting-Ironman-Challenge-In-Goa-PM-Modi-Says-Commendable-Feat",
      keywords: null,
      creator: ["marketing@menafn.com (MENAFN)"],
      video_url: null,
      description:
        '(MENAFN - Live Mint) Bharatiya Janata Party (BJP) MP Tejasvi Surya finished the "daunting challenge" during the fourth edition of the Ironman 70.3 at Miramar Beach in Goa on Sunday, October 26. He ...',
      content: "ONLY AVAILABLE IN PAID PLANS",
      pubDate: "2024-10-27 19:00:42",
      pubDateTZ: "UTC",
      image_url:
        "https://menafn.com/updates/pr/2024-10/27/LM_d888aimage_story.jpg",
      source_id: "menafn",
      source_priority: 1117534,
      source_name: "Menafn",
      source_url: "https://menafn.com",
      source_icon: "https://i.bytvi.com/domain_icons/menafn.png",
      language: "english",
      country: [
        "georgia",
        "yemen",
        "afghanistan",
        "cyprus",
        "india",
        "singapore",
        "saudi arabia",
        "maldives",
        "japan",
        "united arab emirates",
        "malaysia",
        "china",
        "south korea",
        "north korea",
        "taiwan",
        "thailand",
        "pakistan",
        "mongolia",
        "brunei",
        "lebanon",
        "indonesia",
        "kyrgyzstan",
        "syria",
        "israel",
        "bhutan",
        "iran",
        "turkey",
        "armenia",
        "qatar",
        "philippines",
        "kazakhstan",
        "iraq",
        "bangladesh",
        "laos",
        "vietnam",
        "timor-leste",
        "kuwait",
        "myanmar",
        "azerbaijan",
        "jordan",
        "nepal",
        "sri lanka",
        "uzbekistan",
        "turkmenistan",
        "macau",
        "bahrain",
        "cambodia",
        "tajikistan",
      ],
      category: ["top"],
      ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
      ai_org: "ONLY AVAILABLE IN CORPORATE PLANS",
      duplicate: true,
    },
    {
      article_id: "032086e151230043420957e399b6c806",
      title:
        "Daily Deals: Space Marine 2, Sonic X Shadow Generations, LEGO Super Mario, and More",
      link: "https://sea.ign.com/sonic-x-shadow-generations/221974/deal/daily-deals-space-marine-2-sonic-x-shadow-generations-lego-super-mario-and-more",
      keywords: [
        "warhammer 40,000: space marine ii",
        "sonic x shadow generations",
        "deal",
      ],
      creator: ["Noah Hunter"],
      video_url: null,
      description:
        "New deals arrive this Sunday.The weekend is officially here, and we've rounded up the best deals you can find! Discover the best deals for Sunday, October 27, below:Sonic X Shadow Generations for $39.99Sonic X Shadow Generations just released this week, and you can already save $10 off a Nintendo Switch copy ...",
      content: "ONLY AVAILABLE IN PAID PLANS",
      pubDate: "2024-10-27 18:57:19",
      pubDateTZ: "UTC",
      image_url:
        "https://sm.ign.com/ign_ap/deal/d/daily-deal/daily-deals-space-marine-2-sonic-x-shadow-generations-lego-s_85yh.jpg",
      source_id: "ign",
      source_priority: 144,
      source_name: "Ign Southeast Asia",
      source_url: "https://sea.ign.com",
      source_icon: "https://i.bytvi.com/domain_icons/ign.png",
      language: "english",
      country: [
        "vietnam",
        "singapore",
        "malaysia",
        "myanmar",
        "philippines",
        "thailand",
        "brunei",
        "indonesia",
        "cambodia",
      ],
      category: ["top"],
      ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
      ai_org: "ONLY AVAILABLE IN CORPORATE PLANS",
      duplicate: false,
    },
    {
      article_id: "e4e3d946b3a5ee9e1e36fcbf63b143ee",
      title:
        "Van Dijk đóng vai ‘chàng hề’, Liverpool bị Arsenal ngắt mạch thắng: Mất luôn ngôi đầu",
      link: "https://thanhnien.vn/van-dijk-dong-vai-chang-he-liverpool-bi-arsenal-ngat-mach-thang-mat-luon-ngoi-dau-185241028014055156.htm",
      keywords: null,
      creator: null,
      video_url: null,
      description:
        "Trung vệ Virgil van Dijk đã có màn trình diễn thảm họa, khiến Liverpool chỉ tìm được trận hòa 2-2 với Arsenal ở vòng 9 Ngoại hạng Anh rạng sáng 28.10.",
      content: "ONLY AVAILABLE IN PAID PLANS",
      pubDate: "2024-10-27 18:43:00",
      pubDateTZ: "UTC",
      image_url:
        "https://images2.thanhnien.vn/zoom/600_315/528068263637045248/2024/10/27/2024-10-27t171648z-1333401057-up1ekar1bzy5u-rtrmadp-3-soccer-england-ars-liv-report-17300522362701756007244-43-0-1293-2000-crop-1730052244403428651084.jpg",
      source_id: "thanhnien_vn",
      source_priority: 19437,
      source_name: "Thanhnien Vn",
      source_url: "https://thanhnien.vn",
      source_icon: "https://i.bytvi.com/domain_icons/thanhnien_vn.png",
      language: "vietnamese",
      country: ["vietnam"],
      category: ["top"],
      ai_tag: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      sentiment_stats: "ONLY AVAILABLE IN PROFESSIONAL AND CORPORATE PLANS",
      ai_region: "ONLY AVAILABLE IN CORPORATE PLANS",
      ai_org: "ONLY AVAILABLE IN CORPORATE PLANS",
      duplicate: false,
    },
  ],
  nextPage: "1730054580229611487",
};

export const getTopArticles = () => {
  const data = rootData.results.slice(0, 6);
  let articles = data.sort((prev, next) => {
    return next.source_priority - prev.source_priority;
  });

  return articles;
};

export const createArticle = async (
  body: ArticleRequest,
  formData: FormData
) => {
  const token = await getToken();

  const { data }: any = await requestClient.post(
    ARTICLE_ROUTES,
    body,
    HeaderConfig(token, false)
  );

  const result = await requestClient.post(
    `${ARTICLE_ROUTES}/uploads/${data.id}`,
    formData,
    HeaderConfig(token, true)
  );

  return result.data;
};

export const getAllArticle = async (query?: string) => {
  if(!query) query = "";

  const { data } = await requestClient.get(
    ARTICLE_ROUTES + query
  );

  return data;
};

export const getArticleById = async (id: string) => {
  const { data } = await requestClient.get(
    ARTICLE_ROUTES + "/" + id,
  );

  return data;
};