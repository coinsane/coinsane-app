import React from 'react';
import { G, Path, Polygon } from 'react-native-svg';

export default {
  Menu: {
    svg: <G id="menu" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <G id="menu-icon" fill-rule="nonzero">
        <Path d="M22.8421053,8 L5.15789474,8 C4.51840713,8 4,7.55228475 4,7 C4,6.44771525 4.51840713,6 5.15789474,6 L22.8421053,6 C23.4815929,6 24,6.44771525 24,7 C24,7.55228475 23.4815929,8 22.8421053,8 Z" />
        <Path d="M15.8421053,15 L5.15789474,15 C4.51840713,15 4,14.5522847 4,14 C4,13.4477153 4.51840713,13 5.15789474,13 L15.8421053,13 C16.4815929,13 17,13.4477153 17,14 C17,14.5522847 16.4815929,15 15.8421053,15 Z" />
        <Path d="M22.8421053,22 L5.15789474,22 C4.51840713,22 4,21.5522847 4,21 C4,20.4477153 4.51840713,20 5.15789474,20 L22.8421053,20 C23.4815929,20 24,20.4477153 24,21 C24,21.5522847 23.4815929,22 22.8421053,22 Z" />
      </G>
    </G>,
    viewBox: '0 0 28 28',
  },
  Back: {
    svg: <G id="back" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <G id="back-icon" fill-rule="nonzero">
        <Path d="M12.1168013,14.0342672 L18.9946823,20.941609 C19.5792155,21.528646 19.5771858,22.4783913 18.9901488,23.0629245 C18.4031118,23.6474577 17.4533665,23.6454279 16.8688333,23.0583909 L8.93707549,15.0926582 C8.35430817,14.5073947 8.35430817,13.5611398 8.93707549,12.9758762 L16.9370755,4.94160901 C17.5216087,4.35457201 18.471354,4.35254229 19.058391,4.93707549 C19.645428,5.52160869 19.6474577,6.47135399 19.0629245,7.05839099 L12.1168013,14.0342672 Z" />
      </G>
    </G>,
    viewBox: '0 0 28 28',
  },
  Close: {
    svg: <G id="close" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <G id="close-icon" fill-rule="nonzero">
        <Path d="M14,15.3297031 L7.45863964,21.754202 C7.29182111,21.9180808 7.0731145,22 6.85444921,22 C6.63578391,22 6.4170773,21.9180808 6.25025877,21.754202 C5.91658041,21.4264848 5.91658041,20.8951666 6.25025877,20.5674494 L12.9372112,14 L6.25030009,7.43251002 C5.91662172,7.10479282 5.91662172,6.57347467 6.25030009,6.24575747 C6.58397845,5.91808084 7.12496127,5.91808084 7.45863964,6.24575747 L14,12.6702563 L20.5413604,6.24575747 C20.8750387,5.91808084 21.4160215,5.91808084 21.7496999,6.24575747 C22.0833783,6.57347467 22.0833783,7.10479282 21.7496999,7.43251002 L15.0627888,14 L21.7497412,20.5674494 C22.0834196,20.8951666 22.0834196,21.4264848 21.7497412,21.754202 C21.5829227,21.9180808 21.3642161,22 21.1455508,22 C20.9268855,22 20.7081789,21.9180808 20.5413604,21.754202 L14,15.3297031 Z" />
      </G>
    </G>,
    viewBox: '0 0 28 28',
  },
  Portfolio: {
    svg: <G id="portfolio" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <G id="portfolio-icon" fill-rule="nonzero">
        <Path d="M6,10 L6,21 L22,21 L22,10 L6,10 Z M6,8 L22,8 C23.1045695,8 24,8.8954305 24,10 L24,21 C24,22.1045695 23.1045695,23 22,23 L6,23 C4.8954305,23 4,22.1045695 4,21 L4,10 C4,8.8954305 4.8954305,8 6,8 Z" />
        <Path d="M11,6 L11,8 L17,8 L17,6 L11,6 Z M10,4 L18,4 C18.5522847,4 19,4.44771525 19,5 L19,9 C19,9.55228475 18.5522847,10 18,10 L10,10 C9.44771525,10 9,9.55228475 9,9 L9,5 C9,4.44771525 9.44771525,4 10,4 Z" />
      </G>
    </G>,
    viewBox: '0 0 28 28',
  },
  Market: {
    svg: <G id="market" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <G id="market-icon" fill-rule="nonzero">
        <Path d="M10,21.8421053 L10,8.15789474 C10,7.51840713 10.4477153,7 11,7 C11.5522847,7 12,7.51840713 12,8.15789474 L12,21.8421053 C12,22.4815929 11.5522847,23 11,23 C10.4477153,23 10,22.4815929 10,21.8421053 Z M4,21.8421053 L4,14.1578947 C4,13.5184071 4.44771525,13 5,13 C5.55228475,13 6,13.5184071 6,14.1578947 L6,21.8421053 C6,22.4815929 5.55228475,23 5,23 C4.44771525,23 4,22.4815929 4,21.8421053 Z M16,21.8421053 L16,12.1578947 C16,11.5184071 16.4477153,11 17,11 C17.5522847,11 18,11.5184071 18,12.1578947 L18,21.8421053 C18,22.4815929 17.5522847,23 17,23 C16.4477153,23 16,22.4815929 16,21.8421053 Z M22,21.8421053 L22,5.15789474 C22,4.51840713 22.4477153,4 23,4 C23.5522847,4 24,4.51840713 24,5.15789474 L24,21.8421053 C24,22.4815929 23.5522847,23 23,23 C22.4477153,23 22,22.4815929 22,21.8421053 Z" />
      </G>
    </G>,
    viewBox: '0 0 28 28',
  },
  Watchlist: {
    svg: <G id="watchlist" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <G id="watchlist-icon" fill-rule="nonzero">
        <Path d="M25,11.525403 C25,11.1834313 24.7532684,10.9709068 24.2594348,10.8876353 L17.6226427,9.87584971 L14.6479251,3.56828575 C14.4805662,3.18936384 14.2644446,3 14.0000695,3 C13.7357407,3 13.5197579,3.18936384 13.3522602,3.56828575 L10.3774036,9.87584971 L3.74028732,10.8876353 C3.24682419,10.9709068 3,11.1834313 3,11.525403 C3,11.7195738 3.11021418,11.9413722 3.33059622,12.1908955 L8.14315845,17.0982353 L7.0061464,24.0293889 C6.98850287,24.1588361 6.97975057,24.2515273 6.97975057,24.3067341 C6.97975057,24.5008078 7.02596643,24.6647774 7.11849076,24.7988859 C7.21096879,24.9331886 7.34970899,25 7.5348966,25 C7.69364206,25 7.86984581,24.9447932 8.06373941,24.8337968 L13.9999305,21.5618809 L19.9363995,24.8334569 C20.1216334,24.9444533 20.2978835,25 20.4650571,25 C20.8268189,25 21.0075146,24.7693645 21.0075146,24.307074 C21.0075146,24.187095 21.003069,24.0946952 20.9942241,24.0295346 L19.8573046,17.0986237 L24.6564374,12.1912354 C24.8855718,11.9505977 25,11.7287021 25,11.525403 Z M18.0585293,16.2030908 L19.0163478,22 L13.9998602,19.2596824 L8.96994976,22 L9.94137749,16.2030908 L5.86956522,12.1134726 L11.4849516,11.2598512 L13.9998136,6 L16.5145824,11.2598512 L22.1304348,12.1134726 L18.0585293,16.2030908 Z" />
      </G>
    </G>,
    viewBox: '0 0 28 28',
  },
  Settings: {
    svg: <G id="settigns" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <G id="settings-icon" fill-rule="nonzero">
        <Path d="M8,11 C5.790861,11 4,12.790861 4,15 C4,17.209139 5.790861,19 8,19 L20,19 C22.209139,19 24,17.209139 24,15 C24,12.790861 22.209139,11 20,11 L8,11 Z M8,9 L20,9 C23.3137085,9 26,11.6862915 26,15 C26,18.3137085 23.3137085,21 20,21 L8,21 C4.6862915,21 2,18.3137085 2,15 C2,11.6862915 4.6862915,9 8,9 Z" />
        <Path d="M20,21 C16.6862915,21 14,18.3137085 14,15 C14,11.6862915 16.6862915,9 20,9 C23.3137085,9 26,11.6862915 26,15 C26,18.3137085 23.3137085,21 20,21 Z M20,19 C22.209139,19 24,17.209139 24,15 C24,12.790861 22.209139,11 20,11 C17.790861,11 16,12.790861 16,15 C16,17.209139 17.790861,19 20,19 Z" />
      </G>
    </G>,
    viewBox: '0 0 28 28',
  },
  Edit: {
    svg: <G id="edit" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <G id="edit-icon" fill-rule="nonzero">
        <Path d="M23.3755241,6.96079458 L20.0392487,3.62452164 C19.6365418,3.2217714 19.1011081,3 18.5315622,3 C17.9620681,3 17.4266344,3.2217714 17.0239275,3.62450866 L5.05818937,15.590192 C4.92563124,15.7227516 4.84018183,15.8951439 4.81499319,16.0809089 L4.00778942,22.0277624 C3.97180936,22.2929853 4.06175952,22.5597517 4.25102451,22.7489929 C4.41280509,22.9107752 4.63122768,23 4.8569267,23 C4.8952155,23 4.93375075,22.9974448 4.97224708,22.9922047 L10.9190485,22.185031 C11.1048375,22.1598032 11.2772279,22.0744047 11.409786,21.9418062 L23.3755241,9.9761618 C23.778244,9.57345047 24,9.03799798 24,8.46849764 C24,7.89894543 23.778231,7.36350591 23.3755241,6.96079458 Z M10.4021886,20.525507 L5.85758492,21.142363 L6.47446012,16.5977745 L15.370962,7.70131999 L19.2986516,11.6290655 L10.4021886,20.525507 Z M22.1635511,8.76418851 L20.5106246,10.4171052 L16.5828961,6.48937265 L18.2358097,4.83646898 C18.3424269,4.72987655 18.4668655,4.71394865 18.5315622,4.71394865 C18.5962588,4.71394865 18.7206975,4.72987655 18.8273276,4.83646898 L22.163603,8.17274192 C22.2701813,8.27932138 22.2860831,8.40377433 22.2860831,8.46845873 C22.2860831,8.53314314 22.2701683,8.65759609 22.1635511,8.76418851 Z" />
      </G>
    </G>,
    viewBox: '0 0 28 28',
  },
  Search: {
    svg: <G id="search" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <G id="search-icon" fill-rule="nonzero">
        <Path d="M17.2464725,15.9210579 L22.7198521,21.3671786 C23.0933826,21.7407091 23.0933826,22.3463217 22.7198521,22.7198521 C22.3463217,23.0933826 21.7407091,23.0933826 21.3671786,22.7198521 L15.8901812,17.2701316 C14.6716639,18.1986586 13.1502183,18.75 11.5,18.75 C7.49593556,18.75 4.25,15.5040644 4.25,11.5 C4.25,7.49593556 7.49593556,4.25 11.5,4.25 C15.5040644,4.25 18.75,7.49593556 18.75,11.5 C18.75,13.1641863 18.1892856,14.6974108 17.2464725,15.9210579 Z M11.5,17.25 C14.6756373,17.25 17.25,14.6756373 17.25,11.5 C17.25,8.32436269 14.6756373,5.75 11.5,5.75 C8.32436269,5.75 5.75,8.32436269 5.75,11.5 C5.75,14.6756373 8.32436269,17.25 11.5,17.25 Z" />
      </G>
    </G>,
    viewBox: '0 0 28 28',
  },
  Filter: {
    svg: <G id="filter-icon" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <Path d="M11.8292943,22 C11.4174579,23.1651924 10.3062188,24 9,24 C7.69378117,24 6.58254212,23.1651924 6.17070571,22 L4.27368421,22 C3.57024784,22 3,21.5522847 3,21 C3,20.4477153 3.57024784,20 4.27368421,20 L6.17070571,20 C6.58254212,18.8348076 7.69378117,18 9,18 C10.3062188,18 11.4174579,18.8348076 11.8292943,20 L23.7263158,20 C24.4297522,20 25,20.4477153 25,21 C25,21.5522847 24.4297522,22 23.7263158,22 L11.8292943,22 Z M21.8292943,15 C21.4174579,16.1651924 20.3062188,17 19,17 C17.6937812,17 16.5825421,16.1651924 16.1707057,15 L4.27368421,15 C3.57024784,15 3,14.5522847 3,14 C3,13.4477153 3.57024784,13 4.27368421,13 L16.1707057,13 C16.5825421,11.8348076 17.6937812,11 19,11 C20.3062188,11 21.4174579,11.8348076 21.8292943,13 L23.7263158,13 C24.4297522,13 25,13.4477153 25,14 C25,14.5522847 24.4297522,15 23.7263158,15 L21.8292943,15 Z M11.8292943,8 C11.4174579,9.16519237 10.3062188,10 9,10 C7.69378117,10 6.58254212,9.16519237 6.17070571,8 L4.27368421,8 C3.57024784,8 3,7.55228475 3,7 C3,6.44771525 3.57024784,6 4.27368421,6 L6.17070571,6 C6.58254212,4.83480763 7.69378117,4 9,4 C10.3062188,4 11.4174579,4.83480763 11.8292943,6 L23.7263158,6 C24.4297522,6 25,6.44771525 25,7 C25,7.55228475 24.4297522,8 23.7263158,8 L11.8292943,8 Z M9,8.5 C9.82842712,8.5 10.5,7.82842712 10.5,7 C10.5,6.17157288 9.82842712,5.5 9,5.5 C8.17157288,5.5 7.5,6.17157288 7.5,7 C7.5,7.82842712 8.17157288,8.5 9,8.5 Z M19,15.5 C19.8284271,15.5 20.5,14.8284271 20.5,14 C20.5,13.1715729 19.8284271,12.5 19,12.5 C18.1715729,12.5 17.5,13.1715729 17.5,14 C17.5,14.8284271 18.1715729,15.5 19,15.5 Z M9,22.5 C9.82842712,22.5 10.5,21.8284271 10.5,21 C10.5,20.1715729 9.82842712,19.5 9,19.5 C8.17157288,19.5 7.5,20.1715729 7.5,21 C7.5,21.8284271 8.17157288,22.5 9,22.5 Z" id="filter-icon" fill-rule="nonzero" />
    </G>,
    viewBox: '0 0 28 28',
  },
  Check: {
    svg: <G id="check-icon" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <Path d="M23.7071048,6.27919678 C23.3165975,5.90693441 22.6834733,5.90693441 22.2928878,6.27919678 L10.3122775,17.6990282 L5.70712682,13.3094747 C5.31661949,12.9372124 4.68349526,12.9372496 4.2929098,13.3094747 C3.9023634,13.6816999 3.9023634,14.2851834 4.2929098,14.6574458 L9.60516894,19.7209289 C9.99555909,20.093154 10.6291521,20.0928934 11.019386,19.7209289 L23.7071048,7.62720506 C24.0976512,7.25497992 24.0976122,6.65145914 23.7071048,6.27919678 Z" id="check-icon" fill-rule="nonzero" />
    </G>,
    viewBox: '0 0 28 28',
  },
  ChevronRight: {
    svg: <G id="chevronRight-icon" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <Path d="M5.20446689,8.49412448 L11.4955789,14.7831452 C11.7716287,15.0584979 12.2188735,15.0584979 12.4956204,14.7831452 C12.7716702,14.5077925 12.7716702,14.0605477 12.4956204,13.785195 L6.70351253,7.99517842 L12.4949233,2.20516183 C12.7709731,1.92980913 12.7709731,1.48256432 12.4949233,1.20651452 C12.2188735,0.931161826 11.7709316,0.931161826 11.4948818,1.20651452 L5.20376979,7.49547718 C4.93196066,7.7679834 4.93196066,8.22225726 5.20446689,8.49412448 Z" id="Chevron_Right" fill-rule="nonzero" transform="translate(8.851329, 7.994830) scale(-1, 1) translate(-8.851329, -7.994830)" />
    </G>,
    viewBox: '0 0 16 16',
  },
  Category: {
    svg: <G id="triangle" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <Polygon id="triangle-icon" points="2 4 8 8 2 12" />
    </G>,
    viewBox: '0 0 12 16',
  },
  Slack: {
    svg: <G id="slack-icon" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <Path d="M25.8950007,14.8703014 C25.5305023,13.746775 24.3245076,13.1332607 23.2010126,13.4977692 L21.0470221,14.1982856 C20.5700242,12.7282512 20.0615264,11.1652145 19.5845285,9.69818016 C20.8940227,9.27217017 21.738519,8.99766374 21.738519,8.99766374 C22.8620141,8.6331552 23.4755114,7.42712693 23.111013,6.3036006 C22.7465146,5.18007427 21.5405199,4.56655989 20.4170248,4.93106844 L18.2630343,5.63158485 C17.8370362,4.32205416 17.5625374,3.47753437 17.5625374,3.47753437 C17.199539,2.35550808 15.9935443,1.74049366 14.8700493,2.10500221 C13.7465542,2.46951075 13.1330569,3.67553901 13.4975553,4.79906534 L14.1980522,6.95311582 L9.69807207,8.4156501 C9.27357394,7.10611941 8.99907515,6.26159962 8.99907515,6.26159962 C8.63307676,5.13807329 7.42708208,4.52305887 6.30508702,4.88906745 C5.18159197,5.25357599 4.56659468,6.45960426 4.93259307,7.58163055 L5.63308998,9.73718107 L3.41009977,10.460198 C2.3601044,10.8397069 1.770607,11.9722334 2.08410562,13.061259 C2.41110417,14.1952855 3.61559887,14.8868018 4.73009396,14.5252933 C4.73909392,14.5222932 5.61359007,14.2387866 6.95308417,13.8022763 L8.41557772,18.3023818 L6.19258752,19.0253987 C5.14409213,19.4049076 4.55459473,20.5374342 4.86659336,21.6264597 C5.19359192,22.7604863 6.39808661,23.4535025 7.5125817,23.090494 C7.52158166,23.0874939 8.39607781,22.8039873 9.7370719,22.3674771 L10.4600687,24.5905292 C10.839567,25.6390537 11.9720621,26.2285675 13.0610573,25.9165602 C14.1950523,25.5895526 14.8880492,24.3850243 14.5250508,23.2704982 C14.5220508,23.261498 14.2385521,22.3884776 13.803554,21.0474461 C15.2735475,20.5704349 16.8365406,20.061923 18.3035342,19.5849119 L19.026531,21.807964 C19.4060293,22.8564885 20.5385243,23.4460023 21.6275195,23.133995 C22.7615145,22.8069874 23.4545115,21.6024591 23.0915131,20.487933 C23.0885131,20.4789328 22.8050143,19.6059123 22.3685163,18.2648809 C23.6780105,17.8388709 24.5225068,17.5643645 24.5225068,17.5643645 C25.6445018,17.199856 26.2594991,15.9938277 25.8950007,14.8703014 Z M12.4716981,17 C11.9901887,15.5207547 11.48,13.9479245 11,12.4716981 C12.4792453,11.9916981 14.0520755,11.48 15.5283019,11 L17,15.5283019 L12.4716981,17 Z" id="slack" fill-rule="nonzero" />
    </G>,
    viewBox: '0 0 28 28',
  },
  Telegram: {
    svg: <G id="telegram-icon" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <Path d="M2.42391134,14.0694237 L7.95399858,16.1436961 L10.0944814,23.0617161 C10.2314416,23.5047903 10.7705623,23.6685614 11.1284027,23.3745453 L14.2109668,20.8490785 C14.5340872,20.5844882 14.9943278,20.5713029 15.3320082,20.8176428 L20.8918555,24.8742925 C21.274656,25.1539173 21.8169767,24.9431133 21.9129769,24.4782512 L25.9858622,4.78946673 C26.0906623,4.28167198 25.5941817,3.85805411 25.113061,4.04506022 L2.41743133,12.8439146 C1.8573506,13.0609897 1.8622306,13.8578962 2.42391134,14.0694237 Z M9.53442518,14.5664383 L20.7008166,8.02961677 C20.9015005,7.91248238 21.1079702,8.17039801 20.9356366,8.3223349 L11.7201278,16.4643925 C11.3962067,16.7509829 11.1872574,17.1345175 11.1280771,17.550812 L10.8141572,19.7619887 C10.7725822,20.0572207 10.3362517,20.086524 10.2505395,19.8007978 L9.0432124,15.7686567 C8.90493224,15.3087608 9.10644272,14.8175192 9.53442518,14.5664383 Z" />
    </G>,
    viewBox: '0 0 28 28',
  },
  Twitter: {
    svg: <G id="twitter-icon" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <Path d="M26.0005,6.36631471 C25.1171468,6.76786846 24.1693216,7.04019762 23.1734561,7.16177817 C24.1903025,6.53709876 24.9686729,5.54626961 25.3375831,4.3692476 C24.3837578,4.94774088 23.3309106,5.36780127 22.2090815,5.59551335 C21.3107476,4.61236847 20.0329542,4 18.6156674,4 C15.8966259,4 13.6919882,6.26171198 13.6919882,9.04961589 C13.6919882,9.44501417 13.7354793,9.83119937 13.8194812,10.2004872 C9.72817363,9.98967249 6.1002882,7.97876565 3.67219443,4.92311901 C3.24775352,5.66780992 3.00629712,6.53552972 3.00629712,7.46178682 C3.00629712,9.21424448 3.8761598,10.7605141 5.19595416,11.6651667 C4.38907328,11.6374872 3.63019349,11.4097751 2.96582562,11.0312742 L2.96582562,11.0943577 C2.96582562,13.5406935 4.66355004,15.5823777 6.91465944,16.0470551 C6.5022188,16.1609112 6.06730707,16.2239947 5.61737539,16.2239947 C5.29944668,16.2239947 4.99198879,16.1916885 4.69053104,16.1301338 C5.31740787,18.1379831 7.13513498,19.5980761 9.28879121,19.6381068 C7.60455729,20.9920683 5.48090173,21.7967448 3.17430089,21.7967448 C2.7768802,21.7967448 2.38542042,21.772123 2,21.7275059 C4.179147,23.1630173 6.76622473,24 9.54675779,24 C18.6037456,24 23.554445,16.3040157 23.554445,9.62967821 L23.5379349,8.9757905 C24.5052507,8.26799217 25.3420931,7.37870812 26.0005,6.36631471 Z" />
    </G>,
    viewBox: '0 0 28 28',
  },
};
