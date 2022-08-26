import type { Camera, CameraStop } from '@rnmapbox/maps';
import MapboxGL from '@rnmapbox/maps';
import { StatusBar } from 'expo-status-bar';
import type { FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import React, { useRef } from 'react';
import { Platform, View } from 'react-native';

MapboxGL.setWellKnownTileServer(Platform.OS === 'android' ? 'Mapbox' : 'mapbox');
MapboxGL.setAccessToken(
  'sk.eyJ1IjoiY3Jhenltb25rIiwiYSI6ImNsNzZvYWthZDA3dGszd3BiMXl5dmw2YWcifQ.PoJNquv6-MpIRgqbtROPgw'
);

const data = {
  'bus-stops': [
    {
      location: { _latitude: -20.3066091, _longitude: 57.3672399 },
      id: '1395838840',
    },
    {
      id: '1526585117',
      location: { _latitude: -20.2501083, _longitude: 57.6827613 },
    },
    {
      location: { _latitude: -20.0353335, _longitude: 57.5460303 },
      id: '1564822759',
    },
    {
      location: { _latitude: -20.2646104, _longitude: 57.4800525 },
      id: '1668430942',
      name: 'St Jean Road - Osman Avenue',
    },
    {
      location: { _latitude: -20.2622434, _longitude: 57.4818483 },
      id: '1668430950',
      name: 'Quatre Bornes',
    },
    {
      id: '1668430954',
      location: { _latitude: -20.2599411, _longitude: 57.483825 },
      name: 'Quatre Bornes',
    },
    {
      name: 'Sports Centre Rose Hill',
      id: '1668439392',
      location: { _latitude: -20.2453563, _longitude: 57.478542 },
    },
    {
      name: 'Main Bus Station Rose Hill',
      id: '1668439395',
      location: { _latitude: -20.2421941, _longitude: 57.4756654 },
    },
    {
      id: '1668439397',
      location: { _latitude: -20.2478259, _longitude: 57.4818405 },
      name: 'SSS Regis Chaperon',
    },
    {
      location: { _latitude: -20.0957463, _longitude: 57.5586857 },
      id: '1670834498',
      name: 'Sir Seewosagaram Hospital',
    },
    {
      location: { _latitude: -20.4422996, _longitude: 57.5920081 },
      id: '1919076445',
      name: 'Bus Stop New grove road',
    },
    {
      id: '2049430644',
      location: { _latitude: -19.9945999, _longitude: 57.5912969 },
    },
    {
      id: '2049580430',
      location: { _latitude: -19.9870522, _longitude: 57.6218284 },
    },
    {
      id: '2049580434',
      location: { _latitude: -19.9874984, _longitude: 57.6198597 },
    },
    {
      location: { _latitude: -19.9959815, _longitude: 57.5884307 },
      id: '2049580435',
    },
    {
      location: { _latitude: -20.29818, _longitude: 57.5355439 },
      id: '2154335583',
    },
    {
      name: 'Saint Louis',
      location: { _latitude: -20.5138825, _longitude: 57.5123767 },
      id: '2322096228',
    },
    {
      id: '2322096229',
      name: 'Saint Louis',
      location: { _latitude: -20.5139, _longitude: 57.512551 },
    },
    {
      id: '2322096233',
      name: 'balance',
      location: { _latitude: -20.5123526, _longitude: 57.5102443 },
    },
    {
      name: 'balance',
      location: { _latitude: -20.5118602, _longitude: 57.5086377 },
      id: '2322096234',
    },
    {
      id: '1072230144',
      location: { _latitude: -20.2589105, _longitude: 57.4852395 },
      name: 'Sodnacx',
    },
    {
      location: { _latitude: -20.2980857, _longitude: 57.4827607 },
      name: 'Sona Lane',
      id: '1224882185',
    },
    {
      name: 'Shivala',
      id: '2322096235',
      location: { _latitude: -20.5153219, _longitude: 57.5155739 },
    },
    {
      location: { _latitude: -20.5151963, _longitude: 57.5155256 },
      name: 'Shivala',
      id: '2322096240',
    },
    {
      id: '2324283011',
      location: { _latitude: -20.5173959, _longitude: 57.4820298 },
    },
    {
      id: '2324291871',
      location: { _latitude: -20.5114039, _longitude: 57.5079296 },
      name: 'tombe',
    },
    {
      location: { _latitude: -20.283618, _longitude: 57.4978925 },
      id: '2326023594',
    },
    {
      location: { _latitude: -20.3074497, _longitude: 57.5252293 },
      id: '2329206676',
      name: 'Neergheen',
    },
    {
      location: { _latitude: -20.3040537, _longitude: 57.522983 },
      id: '2329208752',
      name: 'Eau Coulee',
    },
    {
      location: { _latitude: -20.3044805, _longitude: 57.5238645 },
      name: 'Eau Coulee TFP',
      id: '2329208753',
    },
    {
      name: 'Saint Paul - CWA',
      location: { _latitude: -20.2893366, _longitude: 57.510678 },
      id: '2329220943',
    },
    {
      id: '2329237233',
      location: { _latitude: -20.2886312, _longitude: 57.5258172 },
      name: 'Camp Fouquereaux',
    },
    {
      name: 'Mesnil',
      location: { _latitude: -20.2913123, _longitude: 57.5144444 },
      id: '2331400006',
    },
    {
      location: { _latitude: -20.2885887, _longitude: 57.5094075 },
      name: 'Eglise Saint Paul',
      id: '2331400007',
    },
    {
      name: 'Eau Coulee - CHA',
      location: { _latitude: -20.3012381, _longitude: 57.5212494 },
      id: '2331400297',
    },
    {
      location: { _latitude: -20.2910744, _longitude: 57.5142633 },
      id: '2331400583',
      name: 'Mesnil',
    },
    {
      id: '2331423806',
      location: { _latitude: -20.2835787, _longitude: 57.5048049 },
      name: 'Phoenix',
    },
    {
      id: '2332098862',
      location: { _latitude: -20.261115, _longitude: 57.4899735 },
      name: 'Shoprite',
    },
    {
      name: 'Bagatelle',
      id: '2332100191',
      location: { _latitude: -20.2241773, _longitude: 57.4936965 },
    },
    {
      id: '2601528189',
      location: { _latitude: -20.0115384, _longitude: 57.5846756 },
    },
    {
      location: { _latitude: -20.3165374, _longitude: 57.5256834 },
      name: 'Jan Palach North',
      id: '2642347890',
    },
    {
      name: 'Jan Palach South',
      id: '2642347895',
      location: { _latitude: -20.3178309, _longitude: 57.5272002 },
    },
    {
      id: '2910995807',
      location: { _latitude: -20.2569199, _longitude: 57.4125204 },
    },
    {
      id: '2911051672',
      location: { _latitude: -20.2444816, _longitude: 57.4144573 },
    },
    {
      location: { _latitude: -20.2429528, _longitude: 57.4135145 },
      id: '2911053012',
    },
    {
      location: { _latitude: -20.0111997, _longitude: 57.5645475 },
      id: '2924397334',
    },
    {
      location: { _latitude: -20.011574, _longitude: 57.5652608 },
      id: '2924397340',
    },
    {
      id: '2998169571',
      location: { _latitude: -20.1838211, _longitude: 57.7239009 },
    },
    {
      id: '2999870436',
      location: { _latitude: -20.1975708, _longitude: 57.7221411 },
    },
    {
      id: '3101465712',
      name: 'Mills Down',
      location: { _latitude: -20.1724822, _longitude: 57.4763288 },
    },
    {
      id: '3101465714',
      location: { _latitude: -20.1750315, _longitude: 57.4671244 },
    },
    {
      location: { _latitude: -20.1755878, _longitude: 57.4658074 },
      id: '3101465716',
    },
    {
      id: '3101465717',
      location: { _latitude: -20.1745228, _longitude: 57.4638519 },
    },
    {
      location: { _latitude: -20.1756828, _longitude: 57.4683559 },
      id: '3101465718',
    },
    {
      location: { _latitude: -20.1734478, _longitude: 57.4671698 },
      id: '3101465719',
    },
    {
      id: '3101465721',
      location: { _latitude: -20.1706431, _longitude: 57.4667434 },
    },
    {
      id: '3101465722',
      location: { _latitude: -20.1757961, _longitude: 57.4692491 },
    },
    {
      id: '3101465727',
      name: 'GRNW',
      location: { _latitude: -20.1747997, _longitude: 57.4728695 },
    },
    {
      location: { _latitude: -20.174621, _longitude: 57.4727274 },
      id: '3101466231',
      name: 'GRNW Down',
    },
    {
      id: '3101466237',
      location: { _latitude: -20.1724154, _longitude: 57.4643266 },
    },
    {
      location: { _latitude: -20.1704012, _longitude: 57.4649381 },
      id: '3101466239',
    },
    {
      id: '3101485209',
      location: { _latitude: -20.1663705, _longitude: 57.4691709 },
    },
    {
      id: '3101485210',
      location: { _latitude: -20.1693107, _longitude: 57.4714372 },
    },
    {
      id: '3101506623',
      location: { _latitude: -20.1779989, _longitude: 57.4704016 },
      name: 'Borstal Down',
    },
    {
      location: { _latitude: -20.1651212, _longitude: 57.4649034 },
      id: '3101531903',
    },
    {
      location: { _latitude: -20.1659697, _longitude: 57.4625564 },
      id: '3101531904',
    },
    {
      id: '3101531905',
      location: { _latitude: -20.1672361, _longitude: 57.4581683 },
    },
    {
      location: { _latitude: -20.1670699, _longitude: 57.4582863 },
      id: '3101531906',
    },
    {
      id: '3101531907',
      location: { _latitude: -20.165942, _longitude: 57.4623258 },
    },
    {
      id: '3101531908',
      location: { _latitude: -20.1647359, _longitude: 57.4657348 },
    },
    {
      id: '3101531909',
      location: { _latitude: -20.1655517, _longitude: 57.4681837 },
    },
    {
      location: { _latitude: -20.1690665, _longitude: 57.4716518 },
      id: '3101531910',
    },
    {
      name: 'Mills',
      id: '3104081547',
      location: { _latitude: -20.1729964, _longitude: 57.4758444 },
    },
    {
      name: 'Vallijee Down',
      location: { _latitude: -20.1697514, _longitude: 57.4812424 },
      id: '3104081549',
    },
    {
      id: '3104081551',
      name: 'Air Mauritius',
      location: { _latitude: -20.1628431, _longitude: 57.5001796 },
    },
    {
      location: { _latitude: -20.1833637, _longitude: 57.4681038 },
      id: '3104104657',
    },
    {
      id: '3104132162',
      location: { _latitude: -20.1794962, _longitude: 57.470235 },
      name: 'Borstal',
    },
    {
      id: '3104132163',
      name: 'Sunray',
      location: { _latitude: -20.1870187, _longitude: 57.470197 },
    },
    {
      name: 'Sunray Down',
      location: { _latitude: -20.1868374, _longitude: 57.4699795 },
      id: '3104132164',
    },
    {
      name: 'Bel Amy',
      id: '3104132165',
      location: { _latitude: -20.1942588, _longitude: 57.469892 },
    },
    {
      location: { _latitude: -20.1924369, _longitude: 57.4699551 },
      id: '3104132166',
      name: 'Neetoo Industries',
    },
    {
      id: '3104132167',
      location: { _latitude: -20.1966674, _longitude: 57.4698998 },
      name: 'Emmaus Down',
    },
    {
      name: 'Emmaus',
      location: { _latitude: -20.197792, _longitude: 57.4700242 },
      id: '3104132168',
    },
    {
      id: '3111782520',
      location: { _latitude: -20.1718742, _longitude: 57.4475341 },
    },
    {
      location: { _latitude: -20.1724855, _longitude: 57.4460724 },
      id: '3111782521',
    },
    {
      location: { _latitude: -20.1728202, _longitude: 57.4446254 },
      id: '3111782522',
    },
    {
      location: { _latitude: -20.235262, _longitude: 57.4628509 },
      id: '3264706587',
    },
    {
      location: { _latitude: -20.2247648, _longitude: 57.4985194 },
      id: '3602870438',
    },
    {
      location: { _latitude: -20.2250165, _longitude: 57.4984921 },
      id: '3602870439',
    },
    {
      id: '3602870441',
      location: { _latitude: -20.221137, _longitude: 57.5009637 },
    },
    {
      id: '3602870442',
      location: { _latitude: -20.2201659, _longitude: 57.5010262 },
    },
    {
      id: '3602870444',
      location: { _latitude: -20.2178706, _longitude: 57.4995947 },
    },
    {
      id: '3602870445',
      location: { _latitude: -20.2199832, _longitude: 57.4871005 },
    },
    {
      id: '3610913230',
      location: { _latitude: -20.2263074, _longitude: 57.5063352 },
    },
    {
      location: { _latitude: -20.2291361, _longitude: 57.5034714 },
      id: '3610913231',
    },
    {
      location: { _latitude: -20.2219469, _longitude: 57.5019237 },
      id: '3610913232',
    },
    {
      location: { _latitude: -20.2264225, _longitude: 57.5063199 },
      id: '3610923017',
    },
    {
      id: '3753990916',
      location: { _latitude: -20.110883, _longitude: 57.5725746 },
    },
    {
      location: { _latitude: -20.174134, _longitude: 57.4740124 },
      id: '3754044231',
    },
    {
      name: 'University of Mauritius',
      id: '3754109290',
      location: { _latitude: -20.2327494, _longitude: 57.4975531 },
    },
    {
      name: 'Ambrose',
      location: { _latitude: -20.2376102, _longitude: 57.4718465 },
      id: '3758574419',
    },
    {
      id: '3766357670',
      location: { _latitude: -20.2881908, _longitude: 57.5254721 },
    },
    {
      name: 'Venus',
      id: '3768473681',
      location: { _latitude: -20.1663548, _longitude: 57.4895225 },
    },
    {
      id: '3992078696',
      location: { _latitude: -20.4432499, _longitude: 57.717181 },
    },
    {
      id: '3999764443',
      location: { _latitude: -20.0995199, _longitude: 57.5830115 },
    },
    {
      id: '4150270870',
      location: { _latitude: -20.4986887, _longitude: 57.483014 },
    },
    {
      location: { _latitude: -20.4999974, _longitude: 57.4825189 },
      id: '4150271118',
    },
    {
      id: '4151568439',
      location: { _latitude: -20.4289473, _longitude: 57.6659259 },
    },
    {
      location: { _latitude: -20.4858093, _longitude: 57.5750377 },
      id: '4151568440',
    },
    {
      id: '4151568441',
      location: { _latitude: -20.3299662, _longitude: 57.3732386 },
    },
    {
      id: '4151568442',
      location: { _latitude: -20.2750652, _longitude: 57.4967646 },
    },
    {
      id: '4151568443',
      location: { _latitude: -20.2980976, _longitude: 57.5356244 },
    },
    {
      location: { _latitude: -20.3197218, _longitude: 57.5418161 },
      id: '4151568444',
    },
    {
      id: '4151568445',
      location: { _latitude: -20.3417111, _longitude: 57.5664194 },
    },
    {
      id: '4151568446',
      location: { _latitude: -20.3784095, _longitude: 57.57319 },
    },
    {
      location: { _latitude: -20.4306652, _longitude: 57.6670637 },
      id: '4151568447',
    },
    {
      location: { _latitude: -20.3991935, _longitude: 57.5855466 },
      id: '4151568448',
    },
    {
      id: '4151568450',
      location: { _latitude: -20.2762818, _longitude: 57.3784753 },
    },
    {
      id: '4151568451',
      location: { _latitude: -20.2763867, _longitude: 57.373006 },
    },
    {
      location: { _latitude: -20.2856258, _longitude: 57.3642741 },
      id: '4151568452',
    },
    {
      id: '4151568453',
      location: { _latitude: -20.2983207, _longitude: 57.400818 },
    },
    {
      id: '4151568454',
      location: { _latitude: -20.3154413, _longitude: 57.4032929 },
    },
    {
      location: { _latitude: -20.3248238, _longitude: 57.3911349 },
      id: '4151568455',
    },
    {
      id: '4151568456',
      location: { _latitude: -20.3276112, _longitude: 57.385339 },
    },
    {
      id: '4151568457',
      location: { _latitude: -20.3312954, _longitude: 57.3703954 },
    },
    {
      id: '4151568458',
      location: { _latitude: -20.3328629, _longitude: 57.3681756 },
    },
    {
      id: '4151568459',
      location: { _latitude: -20.2756282, _longitude: 57.3706209 },
    },
    {
      id: '4151568460',
      location: { _latitude: -20.2867577, _longitude: 57.364092 },
    },
    {
      id: '4151568461',
      location: { _latitude: -20.2885434, _longitude: 57.4027118 },
    },
    {
      id: '4151568462',
      location: { _latitude: -20.328996, _longitude: 57.3759784 },
    },
    {
      location: { _latitude: -20.3363345, _longitude: 57.365554 },
      id: '4151568463',
    },
    {
      location: { _latitude: -20.3405248, _longitude: 57.3644603 },
      id: '4151568464',
    },
    {
      id: '4151568465',
      location: { _latitude: -20.3424698, _longitude: 57.364215 },
    },
    {
      id: '4151568466',
      location: { _latitude: -20.3447641, _longitude: 57.3641963 },
    },
    {
      id: '4151568467',
      location: { _latitude: -20.3483643, _longitude: 57.3643634 },
    },
    {
      id: '4151568468',
      location: { _latitude: -20.4164512, _longitude: 57.3674183 },
    },
    {
      location: { _latitude: -20.4288519, _longitude: 57.3588715 },
      id: '4151568469',
    },
    {
      location: { _latitude: -20.4581077, _longitude: 57.3404245 },
      id: '4151568470',
    },
    {
      location: { _latitude: -20.4664485, _longitude: 57.3424562 },
      id: '4151568471',
    },
    {
      id: '4151568472',
      location: { _latitude: -20.4849522, _longitude: 57.5844556 },
    },
    {
      id: '4151568473',
      location: { _latitude: -20.4860012, _longitude: 57.3547247 },
    },
    {
      location: { _latitude: -20.4908363, _longitude: 57.3741789 },
      id: '4151568474',
    },
    {
      location: { _latitude: -20.4963328, _longitude: 57.3841987 },
      id: '4151568475',
    },
    {
      id: '4151568476',
      location: { _latitude: -20.4976862, _longitude: 57.386204 },
    },
    {
      location: { _latitude: -20.4989622, _longitude: 57.3894549 },
      id: '4151568477',
    },
    {
      location: { _latitude: -20.4999105, _longitude: 57.5475071 },
      id: '4151568478',
    },
    {
      location: { _latitude: -20.5020818, _longitude: 57.4396042 },
      id: '4151568479',
    },
    {
      location: { _latitude: -20.5040771, _longitude: 57.4083171 },
      id: '4151568481',
    },
    {
      location: { _latitude: -20.5108554, _longitude: 57.4712396 },
      id: '4151568482',
    },
    {
      location: { _latitude: -20.5149407, _longitude: 57.4777889 },
      id: '4151568483',
    },
    {
      location: { _latitude: -20.5161092, _longitude: 57.5162349 },
      id: '4151568484',
    },
    {
      location: { _latitude: -20.5163459, _longitude: 57.4970628 },
      id: '4151568485',
    },
    {
      location: { _latitude: -20.5180805, _longitude: 57.5060074 },
      id: '4151568487',
    },
    {
      location: { _latitude: -20.4884328, _longitude: 57.5650776 },
      id: '4151568689',
    },
    {
      location: { _latitude: -20.3197127, _longitude: 57.5417127 },
      id: '4151775266',
    },
    {
      location: { _latitude: -20.3417772, _longitude: 57.5663532 },
      id: '4151775271',
    },
    {
      location: { _latitude: -20.3991086, _longitude: 57.5856405 },
      id: '4151776028',
    },
    {
      id: '4151776287',
      location: { _latitude: -20.5034013, _longitude: 57.400818 },
    },
    {
      id: '4159230907',
      location: { _latitude: -20.2763063, _longitude: 57.4999335 },
      name: 'Pont Fer',
    },
    {
      id: '4159230908',
      name: 'Pont Fer',
      location: { _latitude: -20.2759827, _longitude: 57.4998126 },
    },
    {
      id: '4159230909',
      location: { _latitude: -20.2799737, _longitude: 57.5015928 },
      name: 'Phoenix Women Center',
    },
    {
      id: '4159230910',
      name: 'Women Center',
      location: { _latitude: -20.2799077, _longitude: 57.5016705 },
    },
    {
      name: 'Hotel Dado',
      location: { _latitude: -20.2832025, _longitude: 57.5045271 },
      id: '4159237940',
    },
    {
      name: 'Phoenix',
      id: '4159237944',
      location: { _latitude: -20.2860698, _longitude: 57.5077136 },
    },
    {
      id: '4159243013',
      location: { _latitude: -20.2455912, _longitude: 57.490574 },
    },
    {
      location: { _latitude: -20.2456694, _longitude: 57.490743 },
      id: '4159243014',
    },
    {
      location: { _latitude: -20.2436693, _longitude: 57.4917154 },
      id: '4159243015',
    },
    {
      id: '4159243016',
      location: { _latitude: -20.2436652, _longitude: 57.4919269 },
    },
    {
      location: { _latitude: -20.2417217, _longitude: 57.4880131 },
      id: '4159246901',
    },
    {
      id: '4159246902',
      location: { _latitude: -20.2419048, _longitude: 57.4872875 },
    },
    {
      location: { _latitude: -20.3272227, _longitude: 57.5282165 },
      id: '4215400053',
    },
    {
      location: { _latitude: -20.3274189, _longitude: 57.5287744 },
      id: '4215400054',
    },
    {
      location: { _latitude: -20.3274918, _longitude: 57.5289273 },
      id: '4215400059',
    },
    {
      location: { _latitude: -20.5073401, _longitude: 57.4176826 },
      id: '4221403946',
    },
    {
      id: '4221404020',
      location: { _latitude: -20.507681, _longitude: 57.4182049 },
    },
    {
      id: '4221433514',
      location: { _latitude: -20.012142, _longitude: 57.5846336 },
    },
    {
      location: { _latitude: -20.250747, _longitude: 57.4674555 },
      id: '4304057251',
    },
    {
      location: { _latitude: -20.2482998, _longitude: 57.465851 },
      id: '4304136091',
      name: 'Marin',
    },
    {
      location: { _latitude: -20.2446327, _longitude: 57.4751305 },
      id: '4304899392',
      name: 'Gare UBS',
    },
    {
      location: { _latitude: -20.2443691, _longitude: 57.4747355 },
      name: 'Gare UBS',
      id: '4305067962',
    },
    {
      location: { _latitude: -20.2476721, _longitude: 57.5954081 },
      id: '4319649793',
    },
    {
      id: '4320572189',
      name: 'Acacias',
      location: { _latitude: -20.2559826, _longitude: 57.4692905 },
    },
    {
      location: { _latitude: -20.2505836, _longitude: 57.467939 },
      id: '4321829793',
    },
    {
      location: { _latitude: -20.4070186, _longitude: 57.5611165 },
      id: '4375148383',
    },
    {
      location: { _latitude: -20.007295, _longitude: 57.5562759 },
      id: '4397379594',
    },
    {
      id: '4397379595',
      location: { _latitude: -20.0074062, _longitude: 57.556579 },
    },
    {
      location: { _latitude: -20.2460134, _longitude: 57.7517406 },
      name: 'Caroline',
      id: '4417755607',
    },
    {
      id: '4423253673',
      location: { _latitude: -20.3247457, _longitude: 57.528055 },
    },
    {
      id: '4423272196',
      location: { _latitude: -20.3231876, _longitude: 57.5243423 },
    },
    {
      id: '4425911289',
      location: { _latitude: -20.14729, _longitude: 57.5281522 },
    },
    {
      id: '4460193741',
      location: { _latitude: -20.2172181, _longitude: 57.4957022 },
    },
    {
      id: '4542119490',
      location: { _latitude: -20.2977297, _longitude: 57.4841892 },
    },
    {
      location: { _latitude: -20.2952086, _longitude: 57.4834286 },
      id: '4542119792',
    },
    {
      location: { _latitude: -20.0977024, _longitude: 57.6304585 },
      id: '4550638297',
      name: 'Piton',
    },
    {
      location: { _latitude: -20.0957687, _longitude: 57.6315981 },
      id: '4550639495',
      name: 'Piton',
    },
    {
      id: '4586999395',
      location: { _latitude: -20.3233719, _longitude: 57.5141934 },
    },
    {
      id: '4589104298',
      location: { _latitude: -20.0292474, _longitude: 57.5485698 },
    },
    {
      id: '4623803902',
      location: { _latitude: -20.2188461, _longitude: 57.503495 },
    },
    {
      id: '4623803903',
      location: { _latitude: -20.2189646, _longitude: 57.5046224 },
    },
    {
      id: '4623803908',
      location: { _latitude: -20.2192586, _longitude: 57.5073314 },
    },
    {
      id: '4623803909',
      location: { _latitude: -20.2192816, _longitude: 57.5081586 },
    },
    {
      id: '4623803910',
      location: { _latitude: -20.219299, _longitude: 57.5110236 },
    },
    {
      location: { _latitude: -20.2192871, _longitude: 57.5095414 },
      id: '4623803911',
    },
    {
      id: '4630280257',
      location: { _latitude: -20.2231535, _longitude: 57.4938612 },
      name: 'Bagatelle',
    },
    {
      id: '4643889274',
      location: { _latitude: -20.2321259, _longitude: 57.4986621 },
    },
    {
      location: { _latitude: -20.4347218, _longitude: 57.6588951 },
      id: '4662965008',
      name: 'School',
    },
    {
      id: '4662988357',
      location: { _latitude: -20.2271218, _longitude: 57.4928547 },
    },
    {
      id: '4662988358',
      location: { _latitude: -20.2272708, _longitude: 57.4933663 },
    },
    {
      id: '4665251508',
      location: { _latitude: -20.239074, _longitude: 57.4856389 },
    },
    {
      id: '4665251626',
      location: { _latitude: -20.2388898, _longitude: 57.4854517 },
    },
    {
      id: '4670222989',
      location: { _latitude: -20.2859282, _longitude: 57.6643108 },
    },
    {
      id: '4676318111',
      location: { _latitude: -20.2383237, _longitude: 57.496496 },
    },
    {
      location: { _latitude: -20.2856409, _longitude: 57.6624539 },
      id: '4680984024',
    },
    {
      id: '4680984025',
      location: { _latitude: -20.2856438, _longitude: 57.6606869 },
    },
    {
      location: { _latitude: -20.2836383, _longitude: 57.6559049 },
      id: '4680984073',
    },
    {
      location: { _latitude: -20.2833437, _longitude: 57.6552733 },
      id: '4680984074',
    },
    {
      location: { _latitude: -20.2805989, _longitude: 57.6507886 },
      id: '4680984075',
    },
    {
      id: '4680984076',
      location: { _latitude: -20.2808322, _longitude: 57.651123 },
    },
    {
      id: '4680984077',
      location: { _latitude: -20.2789304, _longitude: 57.6476771 },
    },
    {
      location: { _latitude: -20.2781793, _longitude: 57.6460822 },
      id: '4680984078',
    },
    {
      location: { _latitude: -20.285755, _longitude: 57.6653725 },
      id: '4692296206',
    },
    {
      location: { _latitude: -20.0578828, _longitude: 57.552089 },
      id: '4694804152',
    },
    {
      location: { _latitude: -20.0568234, _longitude: 57.5524589 },
      id: '4694804383',
    },
    {
      location: { _latitude: -19.9912563, _longitude: 57.5936994 },
      id: '4769050125',
    },
    {
      id: '4770685121',
      location: { _latitude: -19.9917064, _longitude: 57.5931957 },
    },
    {
      location: { _latitude: -20.1071077, _longitude: 57.57616 },
      id: '4771406729',
    },
    {
      location: { _latitude: -20.1061773, _longitude: 57.5765311 },
      id: '4771406929',
    },
    {
      id: '4873648430',
      location: { _latitude: -20.016471, _longitude: 57.5791232 },
      name: 'Grand Baie Church Bus Stop',
    },
    {
      location: { _latitude: -20.1568031, _longitude: 57.5053511 },
      id: '4873661809',
    },
    {
      id: '4875817413',
      name: 'Bus stop to flacq',
      location: { _latitude: -20.019937, _longitude: 57.5806075 },
    },
    {
      id: '4876328627',
      location: { _latitude: -20.1647244, _longitude: 57.5171687 },
    },
    {
      id: '4876628210',
      location: { _latitude: -20.1274977, _longitude: 57.5320163 },
    },
    {
      id: '4876628211',
      location: { _latitude: -20.1290484, _longitude: 57.5305117 },
    },
    {
      location: { _latitude: -20.1237764, _longitude: 57.531528 },
      id: '4876628212',
    },
    {
      location: { _latitude: -20.1251237, _longitude: 57.5318444 },
      id: '4876628213',
    },
    {
      location: { _latitude: -20.1204978, _longitude: 57.5316628 },
      id: '4876628214',
    },
    {
      location: { _latitude: -20.1166734, _longitude: 57.5323453 },
      id: '4876628227',
    },
    {
      id: '4876628228',
      location: { _latitude: -20.1173845, _longitude: 57.532171 },
    },
    {
      id: '4876628229',
      location: { _latitude: -20.1143305, _longitude: 57.5360594 },
    },
    {
      location: { _latitude: -20.1140056, _longitude: 57.5368794 },
      id: '4876628230',
    },
    {
      location: { _latitude: -20.1528411, _longitude: 57.5207083 },
      name: 'Vallée de Prêtres',
      id: '4877236724',
    },
    {
      id: '4878211400',
      location: { _latitude: -20.1563478, _longitude: 57.5087643 },
    },
    {
      id: '4981754135',
      location: { _latitude: -20.2851173, _longitude: 57.3642958 },
    },
    {
      id: '4981754185',
      location: { _latitude: -20.2755578, _longitude: 57.3705587 },
    },
    {
      location: { _latitude: -20.2856156, _longitude: 57.3643176 },
      id: '4982089258',
    },
    {
      location: { _latitude: -20.2760988, _longitude: 57.3778683 },
      id: '4983131482',
    },
    {
      location: { _latitude: -20.2655076, _longitude: 57.4164656 },
      id: '4985584725',
    },
    {
      id: '4985584726',
      location: { _latitude: -20.2661525, _longitude: 57.4162531 },
    },
    {
      location: { _latitude: -20.2666573, _longitude: 57.4161327 },
      id: '4985655386',
    },
    {
      id: '4985721412',
      location: { _latitude: -20.2662417, _longitude: 57.417385 },
    },
    {
      location: { _latitude: -20.2637917, _longitude: 57.4166356 },
      id: '4985735296',
    },
    {
      id: '4985849512',
      location: { _latitude: -20.2571563, _longitude: 57.4140345 },
    },
    {
      location: { _latitude: -20.2571461, _longitude: 57.4175417 },
      id: '4985899985',
    },
    {
      id: '4990255676',
      location: { _latitude: -20.1944621, _longitude: 57.4484022 },
    },
    {
      id: '4990486068',
      location: { _latitude: -20.1885867, _longitude: 57.4565377 },
    },
    {
      location: { _latitude: -20.1839329, _longitude: 57.4630083 },
      id: '4990550016',
    },
    {
      location: { _latitude: -20.2839424, _longitude: 57.4647898 },
      id: '4992651989',
    },
    {
      id: '4993166456',
      location: { _latitude: -20.2782533, _longitude: 57.4599643 },
    },
    {
      id: '5032021152',
      location: { _latitude: -20.2137508, _longitude: 57.469674 },
      name: 'Chebel Down',
    },
    {
      name: 'Chebel',
      id: '5032021153',
      location: { _latitude: -20.2128292, _longitude: 57.4698896 },
    },
    {
      location: { _latitude: -20.2790615, _longitude: 57.403552 },
      id: '5244158403',
    },
    {
      id: '5244158404',
      location: { _latitude: -20.2789804, _longitude: 57.4036496 },
    },
    {
      location: { _latitude: -20.2992328, _longitude: 57.3655676 },
      id: '5250184593',
    },
    {
      location: { _latitude: -20.2813262, _longitude: 57.3657574 },
      id: '5250184594',
    },
    {
      id: '5250184596',
      location: { _latitude: -20.2771085, _longitude: 57.3693753 },
    },
    {
      id: '5250184597',
      location: { _latitude: -20.2784108, _longitude: 57.3906389 },
    },
    {
      id: '5250184598',
      location: { _latitude: -20.2603653, _longitude: 57.4077091 },
    },
    {
      location: { _latitude: -20.2570517, _longitude: 57.416662 },
      id: '5250184599',
    },
    {
      id: '5250184600',
      location: { _latitude: -20.2543469, _longitude: 57.4188544 },
    },
    {
      id: '5250184601',
      location: { _latitude: -20.249444, _longitude: 57.4201543 },
    },
    {
      id: '5250184602',
      location: { _latitude: -20.2263732, _longitude: 57.4268346 },
    },
    {
      id: '5250184603',
      location: { _latitude: -20.2211822, _longitude: 57.4307071 },
      name: 'Canot',
    },
    {
      id: '5250184604',
      location: { _latitude: -20.2083946, _longitude: 57.4391319 },
    },
    {
      location: { _latitude: -20.1961944, _longitude: 57.4459346 },
      id: '5250184605',
    },
    {
      location: { _latitude: -20.1879091, _longitude: 57.4574701 },
      id: '5250184606',
    },
    {
      id: '5250184607',
      location: { _latitude: -20.1864956, _longitude: 57.4594725 },
    },
    {
      name: 'Garage UBS',
      id: '5250184609',
      location: { _latitude: -20.1700608, _longitude: 57.4825045 },
    },
    {
      location: { _latitude: -20.2952405, _longitude: 57.4930483 },
      id: '5250218362',
      name: 'Vacoas Bus Station',
    },
    {
      id: '5250314579',
      location: { _latitude: -20.1890382, _longitude: 57.5402968 },
      name: 'Sandokan Bar',
    },
    {
      location: { _latitude: -20.203808, _longitude: 57.765767 },
      name: 'Camp Runnoo',
      id: '5307664824',
    },
    {
      name: 'Balance',
      location: { _latitude: -20.2168537, _longitude: 57.7666371 },
      id: '5307664923',
    },
    {
      name: 'Quatre Cocos',
      location: { _latitude: -20.2070556, _longitude: 57.7689439 },
      id: '5307666324',
    },
    {
      id: '5307676223',
      location: { _latitude: -20.201289, _longitude: 57.756153 },
    },
    {
      id: '5310066825',
      location: { _latitude: -20.237105, _longitude: 57.575832 },
    },
    {
      id: '5310066826',
      location: { _latitude: -20.247153, _longitude: 57.593812 },
    },
    {
      location: { _latitude: -20.247562, _longitude: 57.595714 },
      id: '5310066828',
    },
    {
      id: '5310101221',
      location: { _latitude: -20.24635, _longitude: 57.592293 },
    },
    {
      location: { _latitude: -20.244053, _longitude: 57.645407 },
      id: '5310101223',
    },
    {
      location: { _latitude: -20.245282, _longitude: 57.653327 },
      id: '5310101226',
    },
    {
      id: '5310102621',
      location: { _latitude: -20.247594, _longitude: 57.596204 },
    },
    {
      location: { _latitude: -20.245792, _longitude: 57.597471 },
      id: '5310105021',
    },
    {
      id: '5310114022',
      location: { _latitude: -20.24887, _longitude: 57.611902 },
    },
    {
      id: '5310114023',
      location: { _latitude: -20.246672, _longitude: 57.620751 },
    },
    {
      id: '5310114024',
      location: { _latitude: -20.243313, _longitude: 57.632119 },
    },
    {
      id: '5310118421',
      location: { _latitude: -20.24903, _longitude: 57.608078 },
    },
    {
      id: '5310118422',
      location: { _latitude: -20.2425751, _longitude: 57.6351831 },
    },
    {
      location: { _latitude: -20.248236, _longitude: 57.614595 },
      id: '5310119121',
    },
    {
      location: { _latitude: -20.242054, _longitude: 57.637604 },
      id: '5310119122',
    },
    {
      id: '5310119521',
      location: { _latitude: -20.247447, _longitude: 57.617841 },
    },
    {
      id: '5310119522',
      location: { _latitude: -20.246067, _longitude: 57.623414 },
    },
    {
      id: '5310125721',
      location: { _latitude: -20.242746, _longitude: 57.641216 },
    },
    {
      location: { _latitude: -20.244551, _longitude: 57.656549 },
      id: '5310125724',
    },
    {
      id: '5310125725',
      location: { _latitude: -20.243866, _longitude: 57.659153 },
    },
    {
      id: '5310125726',
      location: { _latitude: -20.24282, _longitude: 57.663194 },
    },
    {
      location: { _latitude: -20.2406521, _longitude: 57.6691958 },
      id: '5310125727',
    },
    {
      id: '5310125728',
      location: { _latitude: -20.238688, _longitude: 57.671179 },
    },
    {
      id: '5310125729',
      location: { _latitude: -20.23549, _longitude: 57.674363 },
    },
    {
      id: '5310125730',
      location: { _latitude: -20.233376, _longitude: 57.676266 },
    },
    {
      location: { _latitude: -20.245313, _longitude: 57.649631 },
      id: '5310127321',
    },
    {
      id: '5310129322',
      location: { _latitude: -20.219897, _longitude: 57.691898 },
    },
    {
      id: '5310129323',
      location: { _latitude: -20.207874, _longitude: 57.711565 },
    },
    {
      location: { _latitude: -20.231418, _longitude: 57.6781 },
      id: '5310134021',
    },
    {
      id: '5310134028',
      location: { _latitude: -20.191257, _longitude: 57.7217 },
    },
    {
      id: '5310135422',
      location: { _latitude: -20.211567, _longitude: 57.705671 },
    },
    {
      id: '5310140721',
      location: { _latitude: -20.216032, _longitude: 57.698279 },
    },
    {
      location: { _latitude: -20.21372, _longitude: 57.702087 },
      id: '5310143321',
    },
    {
      location: { _latitude: -20.209614, _longitude: 57.708574 },
      id: '5310143322',
    },
    {
      location: { _latitude: -20.186658, _longitude: 57.723818 },
      id: '5310151723',
    },
    {
      location: { _latitude: -20.189545, _longitude: 57.722559 },
      id: '5310157622',
    },
    {
      id: '5406683014',
      location: { _latitude: -20.3020002, _longitude: 57.4003158 },
    },
    {
      id: '5474543924',
      location: { _latitude: -20.0111051, _longitude: 57.5845306 },
    },
    {
      location: { _latitude: -20.1646351, _longitude: 57.4960493 },
      id: '5475401922',
    },
    {
      id: '5475432521',
      location: { _latitude: -20.1641642, _longitude: 57.4957902 },
    },
    {
      location: { _latitude: -20.057217, _longitude: 57.5268469 },
      id: '5513200848',
    },
    {
      id: '5513200883',
      location: { _latitude: -20.1328157, _longitude: 57.6018522 },
    },
    {
      location: { _latitude: -20.240547, _longitude: 57.4650956 },
      id: '5533332421',
    },
    {
      location: { _latitude: -20.2915315, _longitude: 57.3638624 },
      id: '5558909432',
    },
    {
      id: '5558930229',
      location: { _latitude: -20.2865087, _longitude: 57.3640788 },
    },
    {
      id: '5558934339',
      location: { _latitude: -20.2828049, _longitude: 57.365088 },
    },
    {
      id: '5558934341',
      location: { _latitude: -20.2826238, _longitude: 57.3652368 },
    },
    {
      location: { _latitude: -19.9933864, _longitude: 57.6144653 },
      id: '5637322520',
      name: 'Cap Malheureux terminus',
    },
    {
      name: 'Mirroverre',
      id: '5736128105',
      location: { _latitude: -20.2242451, _longitude: 57.5114688 },
    },
    {
      location: { _latitude: -20.2251682, _longitude: 57.5096564 },
      name: 'Telfair',
      id: '5736128106',
    },
    {
      id: '5739484369',
      location: { _latitude: -20.1624426, _longitude: 57.4814543 },
    },
    {
      location: { _latitude: -20.1619138, _longitude: 57.4813998 },
      id: '5739484370',
    },
    {
      id: '5757190235',
      location: { _latitude: -20.214768, _longitude: 57.7675511 },
    },
    {
      id: '6014444985',
      location: { _latitude: -20.4329255, _longitude: 57.6761767 },
    },
    {
      location: { _latitude: -20.0215367, _longitude: 57.5545272 },
      id: '6050524986',
    },
    {
      id: '6050525086',
      location: { _latitude: -20.0218213, _longitude: 57.5541799 },
    },
    {
      id: '6204324514',
      location: { _latitude: -20.3430059, _longitude: 57.4714457 },
      name: 'Henrietta Bus Station',
    },
    {
      id: '6266336402',
      location: { _latitude: -20.144799, _longitude: 57.5238165 },
    },
    {
      location: { _latitude: -20.3436162, _longitude: 57.3642291 },
      id: '6286989285',
    },
    {
      id: '6347036516',
      location: { _latitude: -20.1825804, _longitude: 57.7728171 },
    },
    {
      location: { _latitude: -20.1417581, _longitude: 57.7391836 },
      id: '6364032963',
    },
    {
      location: { _latitude: -20.2457084, _longitude: 57.4891337 },
      id: '6419078229',
    },
    {
      location: { _latitude: -20.2459247, _longitude: 57.4843157 },
      id: '6433937567',
    },
    {
      id: '6433937568',
      location: { _latitude: -20.2472137, _longitude: 57.4848077 },
    },
    {
      id: '6434088670',
      location: { _latitude: -20.2564705, _longitude: 57.4869343 },
    },
    {
      location: { _latitude: -20.252522, _longitude: 57.4723209 },
      id: '6449087544',
      name: 'Saint Patrick',
    },
    {
      location: { _latitude: -20.2480062, _longitude: 57.4689007 },
      id: '6451757473',
    },
    {
      id: '6478993821',
      location: { _latitude: -20.2882941, _longitude: 57.7392527 },
    },
    {
      id: '6478993822',
      location: { _latitude: -20.2802302, _longitude: 57.7402068 },
    },
    {
      id: '6495923085',
      location: { _latitude: -20.2430301, _longitude: 57.7830187 },
    },
    {
      id: '6512558185',
      location: { _latitude: -20.102209, _longitude: 57.5826326 },
    },
    {
      location: { _latitude: -20.1026224, _longitude: 57.582302 },
      id: '6512558186',
    },
    {
      name: 'St Thomas',
      id: '6518841514',
      location: { _latitude: -20.2206292, _longitude: 57.4686968 },
    },
    {
      id: '6560001485',
      location: { _latitude: -20.354825, _longitude: 57.365718 },
      name: 'La Preneuse',
    },
    {
      location: { _latitude: -20.2191596, _longitude: 57.469683 },
      id: '6568466483',
    },
    {
      location: { _latitude: -20.2144326, _longitude: 57.4662902 },
      id: '6593384171',
    },
    {
      name: 'Plaza',
      location: { _latitude: -20.2401283, _longitude: 57.4726 },
      id: '6675748153',
    },
    {
      location: { _latitude: -20.3552336, _longitude: 57.3661998 },
      name: 'La Preneuse',
      id: '6948340086',
    },
    {
      id: '6950242879',
      location: { _latitude: -20.4257842, _longitude: 57.6855182 },
    },
    {
      location: { _latitude: -20.4119377, _longitude: 57.6181429 },
      id: '6950242880',
    },
    {
      id: '6950242881',
      location: { _latitude: -20.4206223, _longitude: 57.6630708 },
    },
    {
      location: { _latitude: -20.4058131, _longitude: 57.6080243 },
      id: '6950242882',
    },
    {
      id: '6950242883',
      location: { _latitude: -20.4320132, _longitude: 57.6601651 },
    },
    {
      id: '6950242884',
      location: { _latitude: -20.4006892, _longitude: 57.5996285 },
    },
    {
      id: '6950268885',
      location: { _latitude: -20.4282643, _longitude: 57.6435354 },
    },
    {
      location: { _latitude: -20.3976457, _longitude: 57.5945951 },
      id: '6950268886',
    },
    {
      location: { _latitude: -20.3894032, _longitude: 57.5831093 },
      id: '6950268887',
    },
    {
      id: '6950268888',
      location: { _latitude: -20.3825143, _longitude: 57.57603 },
    },
    {
      id: '6950268889',
      location: { _latitude: -20.4179744, _longitude: 57.6253999 },
    },
    {
      location: { _latitude: -20.4212061, _longitude: 57.7026161 },
      id: '6950268890',
    },
    {
      id: '6950268891',
      location: { _latitude: -20.4237762, _longitude: 57.6777868 },
    },
    {
      id: '6950268892',
      location: { _latitude: -20.4095159, _longitude: 57.6143004 },
    },
    {
      id: '6950268893',
      location: { _latitude: -20.4284618, _longitude: 57.6672627 },
    },
    {
      id: '6950268894',
      location: { _latitude: -20.4041991, _longitude: 57.605401 },
    },
    {
      location: { _latitude: -20.4315778, _longitude: 57.6588656 },
      id: '6950268895',
    },
    {
      id: '6950268897',
      location: { _latitude: -20.4287365, _longitude: 57.6389861 },
    },
    {
      location: { _latitude: -20.394885, _longitude: 57.589855 },
      id: '6950268898',
    },
    {
      location: { _latitude: -20.3870348, _longitude: 57.5808139 },
      id: '6950268899',
    },
    {
      location: { _latitude: -20.4229779, _longitude: 57.6311149 },
      id: '6950268900',
    },
    {
      location: { _latitude: -20.3784944, _longitude: 57.5730702 },
      id: '6950268901',
    },
    {
      location: { _latitude: -20.4164034, _longitude: 57.6236036 },
      id: '6950268902',
    },
    {
      id: '6950268903',
      location: { _latitude: -20.4259247, _longitude: 57.6923367 },
    },
    {
      location: { _latitude: -20.4206144, _longitude: 57.6637346 },
      id: '6950268904',
    },
    {
      id: '6950268905',
      location: { _latitude: -20.4067828, _longitude: 57.6096812 },
    },
    {
      id: '6950268906',
      location: { _latitude: -20.4314121, _longitude: 57.6645107 },
    },
    {
      location: { _latitude: -20.4304879, _longitude: 57.6561063 },
      id: '6950268908',
    },
    {
      id: '6950268909',
      location: { _latitude: -20.3989033, _longitude: 57.5966812 },
    },
    {
      location: { _latitude: -20.4270881, _longitude: 57.6361559 },
      id: '6950268910',
    },
    {
      id: '6950268911',
      location: { _latitude: -20.3926008, _longitude: 57.5865986 },
    },
    {
      location: { _latitude: -20.3846945, _longitude: 57.57835 },
      id: '6950268912',
    },
    {
      location: { _latitude: -20.4196722, _longitude: 57.6273506 },
      id: '6950268913',
    },
    {
      id: '6953916380',
      location: { _latitude: -20.4072761, _longitude: 57.7055921 },
    },
    {
      id: '6960046325',
      location: { _latitude: -20.278282, _longitude: 57.774486 },
    },
    {
      id: '6960046326',
      location: { _latitude: -20.2757495, _longitude: 57.7738905 },
    },
    {
      id: '6960046327',
      location: { _latitude: -20.2725654, _longitude: 57.7723313 },
    },
    {
      id: '6960046328',
      location: { _latitude: -20.26581, _longitude: 57.7666883 },
    },
    {
      location: { _latitude: -20.259523, _longitude: 57.7592305 },
      id: '6960046329',
    },
    {
      location: { _latitude: -20.2549571, _longitude: 57.756532 },
      id: '6960046330',
    },
    {
      id: '6960046331',
      location: { _latitude: -20.2518329, _longitude: 57.7549029 },
    },
    {
      id: '6960046332',
      location: { _latitude: -20.2490064, _longitude: 57.7533556 },
    },
    {
      location: { _latitude: -20.2468553, _longitude: 57.7521561 },
      id: '6960046333',
    },
    {
      location: { _latitude: -20.2442932, _longitude: 57.750695 },
      id: '6960046334',
    },
    {
      id: '6960046335',
      location: { _latitude: -20.2310113, _longitude: 57.7438728 },
    },
    {
      location: { _latitude: -20.21763, _longitude: 57.7385938 },
      id: '6960046336',
    },
    {
      id: '6960046337',
      location: { _latitude: -20.2141546, _longitude: 57.7371893 },
    },
    {
      id: '6960046338',
      location: { _latitude: -20.2090441, _longitude: 57.7297575 },
    },
    {
      id: '6960046339',
      location: { _latitude: -20.2027361, _longitude: 57.7267301 },
    },
    {
      id: '6960046340',
      location: { _latitude: -20.2003802, _longitude: 57.7233717 },
    },
    {
      id: '6960046341',
      location: { _latitude: -20.3011815, _longitude: 57.7770457 },
    },
    {
      id: '6960046342',
      location: { _latitude: -20.3004409, _longitude: 57.7754529 },
    },
    {
      id: '6960046343',
      location: { _latitude: -20.299228, _longitude: 57.7734791 },
    },
    {
      id: '6960046344',
      location: { _latitude: -20.2955968, _longitude: 57.773236 },
    },
    {
      location: { _latitude: -20.2926198, _longitude: 57.7763495 },
      id: '6960046345',
    },
    {
      location: { _latitude: -20.2896513, _longitude: 57.7772945 },
      id: '6960046346',
    },
    {
      location: { _latitude: -20.2870341, _longitude: 57.7769608 },
      id: '6960046347',
    },
    {
      location: { _latitude: -20.1735383, _longitude: 57.5089985 },
      name: 'Ste. Anne',
      id: '6965976103',
    },
    {
      location: { _latitude: -20.1692099, _longitude: 57.5013374 },
      id: '6966161706',
      name: 'Dr. Jeetoo Hospital',
    },
    {
      location: { _latitude: -20.1675606, _longitude: 57.5154043 },
      name: 'Taj Mahal',
      id: '6966161720',
    },
    {
      id: '6972973388',
      name: 'Labourdonnais',
      location: { _latitude: -20.1677273, _longitude: 57.5063186 },
    },
    {
      location: { _latitude: -20.1667179, _longitude: 57.4883719 },
      id: '6976265805',
      name: 'Venus Down',
    },
    {
      location: { _latitude: -20.3997981, _longitude: 57.6933605 },
      id: '6991317037',
    },
    {
      location: { _latitude: -20.3730522, _longitude: 57.7156066 },
      id: '6991317038',
    },
    {
      id: '6991317039',
      location: { _latitude: -20.4019436, _longitude: 57.6983431 },
    },
    {
      location: { _latitude: -20.3872749, _longitude: 57.6962258 },
      id: '6991317040',
    },
    {
      location: { _latitude: -20.3664199, _longitude: 57.7037664 },
      id: '6991317041',
    },
    {
      location: { _latitude: -20.4048456, _longitude: 57.7016042 },
      id: '6991317042',
    },
    {
      id: '6991317043',
      location: { _latitude: -20.3946032, _longitude: 57.6935097 },
    },
    {
      id: '6991317044',
      location: { _latitude: -20.3744721, _longitude: 57.717972 },
    },
    {
      location: { _latitude: -20.3721768, _longitude: 57.7006297 },
      id: '6991317045',
    },
    {
      location: { _latitude: -20.4066403, _longitude: 57.7062874 },
      id: '6991317046',
    },
    {
      id: '6991317047',
      location: { _latitude: -20.3710594, _longitude: 57.7138587 },
    },
    {
      location: { _latitude: -20.4032106, _longitude: 57.6998758 },
      id: '6991317048',
    },
    {
      id: '6991317049',
      location: { _latitude: -20.3904537, _longitude: 57.6950721 },
    },
    {
      id: '6991317050',
      location: { _latitude: -20.3689618, _longitude: 57.7021804 },
    },
    {
      location: { _latitude: -20.3915308, _longitude: 57.6946968 },
      id: '6992600910',
    },
    {
      id: '6992600911',
      location: { _latitude: -20.3439633, _longitude: 57.7635259 },
    },
    {
      id: '6992600912',
      location: { _latitude: -20.3516735, _longitude: 57.7498583 },
    },
    {
      id: '6992600913',
      location: { _latitude: -20.3742237, _longitude: 57.7176172 },
    },
    {
      id: '6992600914',
      location: { _latitude: -20.4016709, _longitude: 57.6977771 },
    },
    {
      id: '6992600915',
      location: { _latitude: -20.3514885, _longitude: 57.7623223 },
    },
    {
      id: '6992600916',
      location: { _latitude: -20.3665894, _longitude: 57.738115 },
    },
    {
      location: { _latitude: -20.3672531, _longitude: 57.7030672 },
      id: '6992600917',
    },
    {
      id: '6992600918',
      location: { _latitude: -20.3406464, _longitude: 57.760483 },
    },
    {
      location: { _latitude: -20.3524811, _longitude: 57.7553144 },
      id: '6992600919',
    },
    {
      id: '6992600920',
      location: { _latitude: -20.3747924, _longitude: 57.7217685 },
    },
    {
      id: '6992600921',
      location: { _latitude: -20.3999621, _longitude: 57.6925229 },
    },
    {
      location: { _latitude: -20.3463172, _longitude: 57.7649277 },
      id: '6992600922',
    },
    {
      id: '6992600923',
      location: { _latitude: -20.3568025, _longitude: 57.7451101 },
    },
    {
      id: '6992600924',
      location: { _latitude: -20.371611, _longitude: 57.7144047 },
    },
    {
      location: { _latitude: -20.3523447, _longitude: 57.7604612 },
      id: '6992600925',
    },
    {
      id: '6992600926',
      location: { _latitude: -20.3686782, _longitude: 57.736545 },
    },
    {
      id: '6992600927',
      location: { _latitude: -20.3871744, _longitude: 57.6960775 },
    },
    {
      location: { _latitude: -20.340482, _longitude: 57.760311 },
      id: '6992600928',
    },
    {
      location: { _latitude: -20.3519439, _longitude: 57.7527064 },
      id: '6992600929',
    },
    {
      id: '6992600930',
      location: { _latitude: -20.3749329, _longitude: 57.7213044 },
    },
    {
      id: '6992600931',
      location: { _latitude: -20.4001626, _longitude: 57.6953466 },
    },
    {
      id: '6992600932',
      location: { _latitude: -20.3495122, _longitude: 57.7643545 },
    },
    {
      id: '6992600933',
      location: { _latitude: -20.3607128, _longitude: 57.7422618 },
    },
    {
      id: '6992600934',
      location: { _latitude: -20.368859, _longitude: 57.7118983 },
    },
    {
      location: { _latitude: -20.3525707, _longitude: 57.7552421 },
      id: '6992600935',
    },
    {
      id: '6992600936',
      location: { _latitude: -20.3717277, _longitude: 57.733752 },
    },
    {
      location: { _latitude: -20.3115132, _longitude: 57.7805294 },
      id: '6996310466',
    },
    {
      id: '6996310467',
      location: { _latitude: -20.3204431, _longitude: 57.7699025 },
    },
    {
      location: { _latitude: -20.3082525, _longitude: 57.7803399 },
      id: '6996310468',
    },
    {
      id: '6996310469',
      location: { _latitude: -20.316454, _longitude: 57.7746299 },
    },
    {
      id: '6996310470',
      location: { _latitude: -20.30092, _longitude: 57.7763447 },
    },
    {
      id: '6996310471',
      location: { _latitude: -20.3243405, _longitude: 57.7702753 },
    },
    {
      location: { _latitude: -20.3102396, _longitude: 57.7803937 },
      id: '6996310472',
    },
    {
      id: '6996310473',
      location: { _latitude: -20.3176803, _longitude: 57.7710828 },
    },
    {
      id: '6996310474',
      location: { _latitude: -20.3048994, _longitude: 57.780687 },
    },
    {
      location: { _latitude: -20.3253955, _longitude: 57.7700858 },
      id: '6996310475',
    },
    {
      id: '7003621937',
      location: { _latitude: -20.2444869, _longitude: 57.6573891 },
    },
    {
      location: { _latitude: -20.2457463, _longitude: 57.6522405 },
      id: '7003621938',
    },
    {
      location: { _latitude: -20.2450719, _longitude: 57.6491335 },
      id: '7003621940',
    },
    {
      id: '7003621941',
      location: { _latitude: -20.2442861, _longitude: 57.6458633 },
    },
    {
      id: '7003621942',
      location: { _latitude: -20.24225, _longitude: 57.6394441 },
    },
    {
      id: '7003621945',
      location: { _latitude: -20.2428591, _longitude: 57.6344776 },
    },
    {
      id: '7003621947',
      location: { _latitude: -20.2456165, _longitude: 57.6259141 },
    },
    {
      id: '7003621948',
      location: { _latitude: -20.24663, _longitude: 57.6212798 },
    },
    {
      location: { _latitude: -20.2479301, _longitude: 57.6162204 },
      id: '7003621949',
    },
    {
      id: '7003621951',
      location: { _latitude: -20.2495122, _longitude: 57.6094008 },
    },
    {
      location: { _latitude: -20.2469907, _longitude: 57.6024968 },
      id: '7003621952',
    },
    {
      location: { _latitude: -20.2111066, _longitude: 57.7066885 },
      id: '7003621954',
    },
    {
      id: '7003621955',
      location: { _latitude: -20.2139299, _longitude: 57.7019061 },
    },
    {
      id: '7003621956',
      location: { _latitude: -20.2164076, _longitude: 57.6979225 },
    },
    {
      id: '7003621957',
      location: { _latitude: -20.2200567, _longitude: 57.6917673 },
    },
    {
      id: '7003621958',
      location: { _latitude: -20.2301597, _longitude: 57.6794183 },
    },
    {
      id: '7003621959',
      location: { _latitude: -20.2340554, _longitude: 57.6757745 },
    },
    {
      location: { _latitude: -20.2392593, _longitude: 57.6708487 },
      id: '7003621960',
    },
    {
      location: { _latitude: -20.2405067, _longitude: 57.6695365 },
      id: '7003621961',
    },
    {
      location: { _latitude: -20.2430396, _longitude: 57.6624813 },
      id: '7003621962',
    },
    {
      location: { _latitude: -20.2949868, _longitude: 57.5431273 },
      id: '7003622694',
    },
    {
      id: '7003622695',
      location: { _latitude: -20.2565807, _longitude: 57.5648129 },
    },
    {
      id: '7003622696',
      location: { _latitude: -20.284534, _longitude: 57.5489017 },
    },
    {
      id: '7003622697',
      location: { _latitude: -20.2555247, _longitude: 57.5666234 },
    },
    {
      location: { _latitude: -20.2839758, _longitude: 57.548979 },
      id: '7003622698',
    },
    {
      location: { _latitude: -20.2548723, _longitude: 57.5708498 },
      id: '7003622699',
    },
    {
      id: '7003622700',
      location: { _latitude: -20.2813475, _longitude: 57.550522 },
    },
    {
      id: '7003622701',
      location: { _latitude: -20.2534955, _longitude: 57.5868414 },
    },
    {
      location: { _latitude: -20.2768091, _longitude: 57.55213 },
      id: '7003622702',
    },
    {
      id: '7003622703',
      location: { _latitude: -20.2509268, _longitude: 57.5896572 },
    },
    {
      location: { _latitude: -20.276716, _longitude: 57.5524172 },
      id: '7003622704',
    },
    {
      id: '7003622707',
      location: { _latitude: -20.2691567, _longitude: 57.5547963 },
    },
    {
      location: { _latitude: -20.2629499, _longitude: 57.5586505 },
      id: '7003622708',
    },
    {
      location: { _latitude: -20.298469, _longitude: 57.5378584 },
      id: '7003622709',
    },
    {
      id: '7003622710',
      location: { _latitude: -20.2631293, _longitude: 57.558695 },
    },
    {
      id: '7007557815',
      location: { _latitude: -20.1659486, _longitude: 57.7349469 },
    },
    {
      location: { _latitude: -20.1656399, _longitude: 57.7367305 },
      id: '7007557821',
    },
    {
      id: '7025121010',
      location: { _latitude: -20.2212145, _longitude: 57.4620643 },
    },
    {
      id: '7025121011',
      location: { _latitude: -20.2225859, _longitude: 57.4636127 },
    },
    {
      id: '7025121024',
      location: { _latitude: -20.2297488, _longitude: 57.4633051 },
    },
    {
      location: { _latitude: -20.247679, _longitude: 57.4687678 },
      id: '7025121026',
    },
    {
      id: '7025121027',
      location: { _latitude: -20.2509767, _longitude: 57.4705405 },
    },
    {
      name: 'Canot',
      id: '7057357508',
      location: { _latitude: -20.2218148, _longitude: 57.4305353 },
    },
    {
      name: 'KFC Down',
      id: '7063773235',
      location: { _latitude: -20.234451, _longitude: 57.4705059 },
    },
    {
      name: 'Ambrose Down',
      id: '7063793928',
      location: { _latitude: -20.2369436, _longitude: 57.4715124 },
    },
    {
      id: '7081653076',
      name: 'St John',
      location: { _latitude: -20.2164069, _longitude: 57.4693857 },
    },
    {
      location: { _latitude: -20.1560295, _longitude: 57.491954 },
      id: '7085975487',
    },
    {
      id: '7099106015',
      location: { _latitude: -20.2495776, _longitude: 57.4885764 },
    },
    {
      id: '7159358922',
      location: { _latitude: -20.2445234, _longitude: 57.4530163 },
      name: 'Camp Levieux',
    },
    {
      id: '7159358923',
      location: { _latitude: -20.2466106, _longitude: 57.4537395 },
    },
    {
      location: { _latitude: -20.2449374, _longitude: 57.4570826 },
      id: '7159358925',
    },
    {
      location: { _latitude: -20.243133, _longitude: 57.4564818 },
      id: '7159358926',
    },
    {
      id: '7159358927',
      location: { _latitude: -20.24153, _longitude: 57.4559963 },
    },
    {
      id: '7159358928',
      location: { _latitude: -20.2391518, _longitude: 57.456408 },
    },
    {
      location: { _latitude: -20.2312866, _longitude: 57.4541791 },
      id: '7159358930',
    },
    {
      id: '7159358931',
      location: { _latitude: -20.2309443, _longitude: 57.4519803 },
    },
    {
      id: '7159358932',
      location: { _latitude: -20.2301352, _longitude: 57.4397676 },
    },
    {
      id: '7159358933',
      location: { _latitude: -20.2120607, _longitude: 57.4361855 },
    },
    {
      location: { _latitude: -20.2083002, _longitude: 57.439376 },
      id: '7159358934',
    },
    {
      location: { _latitude: -20.1974172, _longitude: 57.4451159 },
      id: '7159358935',
    },
    {
      id: '7159358936',
      location: { _latitude: -20.19401, _longitude: 57.4492183 },
    },
    {
      location: { _latitude: -20.1878525, _longitude: 57.4578269 },
      id: '7159358937',
    },
    {
      id: '7159358938',
      location: { _latitude: -20.1864138, _longitude: 57.4598184 },
    },
    {
      id: '7161881254',
      location: { _latitude: -20.1846805, _longitude: 57.4621198 },
    },
    {
      id: '7161881255',
      location: { _latitude: -20.1999244, _longitude: 57.4434382 },
    },
    {
      id: '7161881279',
      location: { _latitude: -20.1711938, _longitude: 57.4789359 },
      name: 'Vallijee',
    },
    {
      id: '7161900490',
      name: 'Camp Levieux',
      location: { _latitude: -20.2445234, _longitude: 57.4530163 },
    },
    {
      id: '7161900492',
      location: { _latitude: -20.2464573, _longitude: 57.455378 },
    },
    {
      id: '7161900494',
      location: { _latitude: -20.243133, _longitude: 57.4564818 },
    },
    {
      location: { _latitude: -20.24153, _longitude: 57.4559963 },
      id: '7161900495',
    },
    {
      id: '7161900496',
      location: { _latitude: -20.2391518, _longitude: 57.456408 },
    },
    {
      location: { _latitude: -20.2362333, _longitude: 57.4558407 },
      id: '7161900497',
    },
    {
      location: { _latitude: -20.2312866, _longitude: 57.4541791 },
      id: '7161900498',
    },
    {
      id: '7161900499',
      location: { _latitude: -20.2309443, _longitude: 57.4519803 },
    },
    {
      id: '7161900500',
      location: { _latitude: -20.2301352, _longitude: 57.4397676 },
    },
    {
      location: { _latitude: -20.2120607, _longitude: 57.4361855 },
      id: '7161900501',
    },
    {
      location: { _latitude: -20.2083002, _longitude: 57.439376 },
      id: '7161900502',
    },
    {
      id: '7161900503',
      location: { _latitude: -20.1974172, _longitude: 57.4451159 },
    },
    {
      location: { _latitude: -20.19401, _longitude: 57.4492183 },
      id: '7161900504',
    },
    {
      id: '7161900505',
      location: { _latitude: -20.1878525, _longitude: 57.4578269 },
    },
    {
      location: { _latitude: -20.1864138, _longitude: 57.4598184 },
      id: '7161900506',
    },
    {
      location: { _latitude: -20.1596625, _longitude: 57.5036507 },
      name: 'Port Louis Immigration',
      id: '7164789542',
    },
    {
      location: { _latitude: -20.1654143, _longitude: 57.4939536 },
      id: '7164789543',
      name: 'La Butte Down',
    },
    {
      id: '7164789544',
      location: { _latitude: -20.1694364, _longitude: 57.4819654 },
    },
    {
      location: { _latitude: -20.1693672, _longitude: 57.4819332 },
      id: '7164789545',
    },
    {
      id: '7164789546',
      location: { _latitude: -20.169308, _longitude: 57.4819185 },
    },
    {
      id: '7164789547',
      location: { _latitude: -20.1832506, _longitude: 57.4684297 },
    },
    {
      id: '7164789548',
      location: { _latitude: -20.1916135, _longitude: 57.4524075 },
    },
    {
      id: '7164789549',
      location: { _latitude: -20.2011786, _longitude: 57.442551 },
    },
    {
      location: { _latitude: -20.2111345, _longitude: 57.4366173 },
      id: '7164789550',
    },
    {
      id: '7164789551',
      location: { _latitude: -20.2300087, _longitude: 57.436974 },
    },
    {
      location: { _latitude: -20.2310154, _longitude: 57.4522144 },
      id: '7164789552',
    },
    {
      id: '7164789553',
      location: { _latitude: -20.2312419, _longitude: 57.4540852 },
    },
    {
      location: { _latitude: -20.2324348, _longitude: 57.4553539 },
      id: '7164789554',
    },
    {
      id: '7164789555',
      location: { _latitude: -20.235933, _longitude: 57.4552935 },
    },
    {
      location: { _latitude: -20.2409424, _longitude: 57.4559239 },
      id: '7164789556',
    },
    {
      id: '7164789557',
      location: { _latitude: -20.2427304, _longitude: 57.4557173 },
    },
    {
      location: { _latitude: -20.2457099, _longitude: 57.45664 },
      id: '7164789558',
    },
    {
      location: { _latitude: -20.2448631, _longitude: 57.4552265 },
      id: '7164789559',
    },
    {
      location: { _latitude: -20.163313, _longitude: 57.4993866 },
      id: '7176151924',
    },
    {
      location: { _latitude: -20.2421914, _longitude: 57.4756513 },
      id: '7176151925',
    },
    {
      name: 'Eglise Universelle',
      id: '7176151927',
      location: { _latitude: -20.1913542, _longitude: 57.4697775 },
    },
    {
      name: 'Belle Etoile Down',
      location: { _latitude: -20.2026518, _longitude: 57.4698097 },
      id: '7176151928',
    },
    {
      name: 'St John Down',
      location: { _latitude: -20.2173285, _longitude: 57.4691562 },
      id: '7176151929',
    },
    {
      location: { _latitude: -20.2236579, _longitude: 57.4681923 },
      id: '7176151930',
      name: 'Tangs Way Down',
    },
    {
      location: { _latitude: -20.2276511, _longitude: 57.4677612 },
      name: 'Gool',
      id: '7176151931',
    },
    {
      location: { _latitude: -20.2422648, _longitude: 57.4759948 },
      id: '7176712551',
      name: 'Margéot Station Drop Off',
    },
    {
      id: '7176723501',
      location: { _latitude: -20.2353869, _longitude: 57.4711172 },
      name: 'KFC',
    },
    {
      id: '7176723502',
      location: { _latitude: -20.2334931, _longitude: 57.4694865 },
      name: "Nid d'Hirondelle",
    },
    {
      id: '7176723503',
      location: { _latitude: -20.2290121, _longitude: 57.4677524 },
      name: 'Restaurant Mama',
    },
    {
      location: { _latitude: -20.2250293, _longitude: 57.4681011 },
      name: 'Tangs Way',
      id: '7176723504',
    },
    {
      location: { _latitude: -20.20239, _longitude: 57.4699733 },
      id: '7176723505',
      name: 'Belle Etoile',
    },
    {
      name: 'La Butte',
      id: '7176723506',
      location: { _latitude: -20.1655112, _longitude: 57.4938664 },
    },
    {
      location: { _latitude: -20.3207935, _longitude: 57.4847019 },
      id: '7177085809',
    },
    {
      id: '7188513794',
      name: 'Belle-Rose',
      location: { _latitude: -20.2501886, _longitude: 57.4837372 },
    },
    {
      id: '7188513795',
      location: { _latitude: -20.2496521, _longitude: 57.4835543 },
      name: 'Belle-Rose',
    },
    {
      id: '7188513796',
      location: { _latitude: -20.2554643, _longitude: 57.4870085 },
      name: 'Saint Jean',
    },
    {
      id: '7188513797',
      name: 'Saint Jean',
      location: { _latitude: -20.2541585, _longitude: 57.4861166 },
    },
    {
      id: '7188513798',
      name: 'Chez Kerda',
      location: { _latitude: -20.2519703, _longitude: 57.48491 },
    },
    {
      id: '7188513799',
      name: 'Shoprite',
      location: { _latitude: -20.2598172, _longitude: 57.4896139 },
    },
    {
      name: 'Oxenham',
      location: { _latitude: -20.2663498, _longitude: 57.493434 },
      id: '7188513800',
    },
    {
      id: '7188513801',
      name: 'Oxenham',
      location: { _latitude: -20.2665806, _longitude: 57.4931698 },
    },
    {
      name: 'Castel',
      location: { _latitude: -20.2950174, _longitude: 57.5188326 },
      id: '7188513802',
    },
    {
      name: 'Castel',
      id: '7188513803',
      location: { _latitude: -20.2948951, _longitude: 57.5186638 },
    },
    {
      name: 'Eau Coulée',
      id: '7188513804',
      location: { _latitude: -20.3084665, _longitude: 57.5250991 },
    },
    {
      id: '7188513805',
      location: { _latitude: -20.3109782, _longitude: 57.5243989 },
      name: 'Eglise Ste Helene',
    },
    {
      id: '7188513806',
      location: { _latitude: -20.3119764, _longitude: 57.5239907 },
      name: 'Eglise Ste Helene',
    },
    {
      location: { _latitude: -20.3144183, _longitude: 57.5241452 },
      name: 'Cinema Novelty',
      id: '7188513807',
    },
    {
      name: 'Castel Bijouterie Kulpoo',
      location: { _latitude: -20.2973818, _longitude: 57.5197983 },
      id: '7189370637',
    },
    {
      location: { _latitude: -20.3170236, _longitude: 57.5263882 },
      name: 'Jan Palach North',
      id: '7191794970',
    },
    {
      id: '7197215830',
      location: { _latitude: -20.2715242, _longitude: 57.4152575 },
    },
    {
      location: { _latitude: -20.3638951, _longitude: 57.3788815 },
      id: '7197342490',
    },
    {
      id: '7197896165',
      location: { _latitude: -20.2271736, _longitude: 57.4811825 },
    },
    {
      id: '7202712965',
      location: { _latitude: -20.245923, _longitude: 57.4791471 },
      name: 'Ah Ling',
    },
    {
      id: '7202712966',
      location: { _latitude: -20.3163684, _longitude: 57.5255081 },
      name: 'Jan Palach North Boarding',
    },
    {
      location: { _latitude: -20.2234957, _longitude: 57.4635783 },
      id: '7216741776',
    },
    {
      location: { _latitude: -20.2904196, _longitude: 57.4408717 },
      id: '7629731988',
    },
    {
      id: '7629748885',
      location: { _latitude: -20.2902091, _longitude: 57.4406633 },
    },
    {
      id: '7629748985',
      location: { _latitude: -20.3025765, _longitude: 57.5216882 },
    },
    {
      location: { _latitude: -20.3927658, _longitude: 57.3777656 },
      id: '8021412075',
    },
    {
      id: '8021413518',
      location: { _latitude: -20.3866377, _longitude: 57.3817912 },
    },
    {
      location: { _latitude: -20.2798969, _longitude: 57.4181088 },
      id: '8095526071',
    },
    {
      id: '8106087584',
      location: { _latitude: -20.4052409, _longitude: 57.3695079 },
    },
    {
      name: '198',
      id: '8747223379',
      location: { _latitude: -20.1644777, _longitude: 57.4959303 },
    },
    {
      location: { _latitude: -20.4308974, _longitude: 57.6651281 },
      name: '198',
      id: '8747223380',
    },
    {
      id: '8747223385',
      name: '198 (Port Louis)',
      location: { _latitude: -20.406395, _longitude: 57.7089728 },
    },
    {
      name: '9, 10 (Airport)',
      location: { _latitude: -20.4064376, _longitude: 57.7085616 },
      id: '8747223386',
    },
    {
      location: { _latitude: -20.4488003, _longitude: 57.649217 },
      id: '8947328172',
    },
    {
      location: { _latitude: -20.2673622, _longitude: 57.486784 },
      id: '9103899274',
    },
    {
      id: '9103899278',
      location: { _latitude: -20.2703853, _longitude: 57.4898712 },
    },
    {
      location: { _latitude: -20.2706847, _longitude: 57.4905552 },
      id: '9103899279',
    },
    {
      location: { _latitude: -20.2732914, _longitude: 57.4938382 },
      id: '9103899286',
    },
    {
      location: { _latitude: -20.2762334, _longitude: 57.4965392 },
      id: '9103899308',
    },
    {
      id: '9209258997',
      location: { _latitude: -20.2683051, _longitude: 57.488455 },
    },
    {
      id: '9209258998',
      location: { _latitude: -20.2658758, _longitude: 57.4904908 },
    },
    {
      id: '9209284564',
      location: { _latitude: -20.282698, _longitude: 57.5119176 },
    },
    {
      location: { _latitude: -20.2858806, _longitude: 57.523203 },
      id: '9209284566',
    },
    {
      location: { _latitude: -20.2859422, _longitude: 57.523836 },
      id: '9209284567',
    },
    {
      id: '9209284568',
      location: { _latitude: -20.2820262, _longitude: 57.5113249 },
    },
    {
      id: '9209686921',
      location: { _latitude: -20.2238879, _longitude: 57.5289282 },
    },
    {
      location: { _latitude: -20.2239923, _longitude: 57.5294955 },
      id: '9209686922',
    },
    {
      id: '9209686924',
      location: { _latitude: -20.2244164, _longitude: 57.5354004 },
    },
    {
      id: '9214802404',
      location: { _latitude: -20.249433, _longitude: 57.4931388 },
    },
    {
      id: '9214804762',
      location: { _latitude: -20.2826156, _longitude: 57.4282052 },
    },
    {
      location: { _latitude: -20.2383496, _longitude: 57.4965218 },
      id: '9225077370',
    },
    {
      location: { _latitude: -20.278514, _longitude: 57.4967149 },
      id: '9225103765',
    },
    {
      location: { _latitude: -20.1012868, _longitude: 57.5770551 },
      id: '9236068419',
    },
    {
      id: '9236229408',
      location: { _latitude: -20.0714661, _longitude: 57.6103386 },
    },
    {
      location: { _latitude: -20.0330898, _longitude: 57.5899324 },
      id: '9236229601',
    },
    {
      location: { _latitude: -20.054422, _longitude: 57.6126453 },
      id: '9236229612',
    },
    {
      id: '9236229630',
      location: { _latitude: -20.0718364, _longitude: 57.6098236 },
    },
    {
      id: '9236229634',
      location: { _latitude: -20.0767754, _longitude: 57.6061437 },
    },
    {
      id: '9236229655',
      location: { _latitude: -20.0796989, _longitude: 57.6035111 },
    },
    {
      location: { _latitude: -20.0796549, _longitude: 57.6031288 },
      id: '9236229657',
    },
    {
      location: { _latitude: -20.1638923, _longitude: 57.5679436 },
      id: '9236229792',
    },
    {
      id: '9236229793',
      location: { _latitude: -20.163536, _longitude: 57.5683165 },
    },
    {
      id: '9237601973',
      location: { _latitude: -20.2489801, _longitude: 57.5345837 },
    },
    {
      location: { _latitude: -20.0092876, _longitude: 57.5614465 },
      id: '9241264850',
    },
    {
      location: { _latitude: -20.0152981, _longitude: 57.5812773 },
      id: '9241267182',
    },
    {
      location: { _latitude: -20.0157251, _longitude: 57.5751534 },
      id: '9241270410',
    },
    {
      location: { _latitude: -20.0067507, _longitude: 57.5573334 },
      id: '9241281911',
    },
    {
      location: { _latitude: -20.0022168, _longitude: 57.5819992 },
      id: '9241283251',
    },
    {
      id: '9241283555',
      location: { _latitude: -20.0163972, _longitude: 57.5782084 },
    },
    {
      location: { _latitude: -20.0094658, _longitude: 57.5618218 },
      id: '9241286482',
    },
    {
      location: { _latitude: -20.0139441, _longitude: 57.587495 },
      id: '9242819966',
    },
    {
      id: '9242856689',
      location: { _latitude: -20.0141427, _longitude: 57.5878627 },
    },
    {
      id: '9243523283',
      location: { _latitude: -20.1083715, _longitude: 57.5410828 },
    },
    {
      location: { _latitude: -20.0170036, _longitude: 57.55814 },
      id: '9243619147',
    },
    {
      location: { _latitude: -19.9989729, _longitude: 57.5849442 },
      id: '9247777408',
    },
    {
      location: { _latitude: -20.0216892, _longitude: 57.5805155 },
      id: '9247816419',
    },
    {
      id: '9257836566',
      location: { _latitude: -20.0376337, _longitude: 57.5473054 },
    },
    {
      location: { _latitude: -20.0195157, _longitude: 57.5584736 },
      id: '9257836567',
    },
    {
      id: '9257836568',
      location: { _latitude: -19.9857008, _longitude: 57.6173013 },
    },
    {
      location: { _latitude: -20.0050041, _longitude: 57.5814381 },
      id: '9257836569',
    },
    {
      id: '9257838987',
      location: { _latitude: -20.0552069, _longitude: 57.552743 },
    },
    {
      id: '9257838988',
      location: { _latitude: -20.0433981, _longitude: 57.5509656 },
    },
    {
      location: { _latitude: -19.9854816, _longitude: 57.6072086 },
      id: '9257838989',
    },
    {
      location: { _latitude: -20.0104217, _longitude: 57.584024 },
      id: '9257839788',
    },
    {
      id: '9257841370',
      location: { _latitude: -20.1144617, _longitude: 57.5600754 },
    },
    {
      id: '9257841371',
      location: { _latitude: -20.0626259, _longitude: 57.5507981 },
    },
    {
      id: '9257846270',
      location: { _latitude: -20.0018375, _longitude: 57.5824915 },
    },
    {
      id: '9257849298',
      location: { _latitude: -20.0478609, _longitude: 57.5545233 },
    },
    {
      id: '9257853486',
      location: { _latitude: -20.1262879, _longitude: 57.5424181 },
    },
    {
      id: '9257853487',
      location: { _latitude: -20.0228361, _longitude: 57.5532691 },
    },
    {
      id: '9257855639',
      location: { _latitude: -20.0605889, _longitude: 57.5512689 },
    },
    {
      location: { _latitude: -20.0104202, _longitude: 57.5571926 },
      id: '9257855640',
    },
    {
      location: { _latitude: -19.9922621, _longitude: 57.6160164 },
      id: '9257855641',
    },
    {
      location: { _latitude: -20.0536123, _longitude: 57.5529529 },
      id: '9257857700',
    },
    {
      id: '9257857701',
      location: { _latitude: -20.010957, _longitude: 57.5574201 },
    },
    {
      id: '9257858418',
      location: { _latitude: -20.1006841, _longitude: 57.5410029 },
    },
    {
      location: { _latitude: -20.1043797, _longitude: 57.5788885 },
      id: '9257860003',
    },
    {
      location: { _latitude: -20.0749588, _longitude: 57.5472588 },
      id: '9257860004',
    },
    {
      id: '9257860341',
      location: { _latitude: -20.1277136, _longitude: 57.5320479 },
    },
    {
      id: '9257860349',
      location: { _latitude: -19.991331, _longitude: 57.6173353 },
    },
    {
      location: { _latitude: -20.1108705, _longitude: 57.5403325 },
      id: '9257868630',
    },
    {
      id: '9257868755',
      location: { _latitude: -20.112167, _longitude: 57.5662233 },
    },
    {
      location: { _latitude: -20.1249279, _longitude: 57.5468871 },
      id: '9257868889',
    },
    {
      location: { _latitude: -20.072048, _longitude: 57.5481882 },
      id: '9257868890',
    },
    {
      location: { _latitude: -20.0515406, _longitude: 57.5535897 },
      id: '9257868891',
    },
    {
      location: { _latitude: -20.0766524, _longitude: 57.5466104 },
      id: '9257869222',
    },
    {
      id: '9257869341',
      location: { _latitude: -20.0798153, _longitude: 57.5455027 },
    },
    {
      id: '9257869342',
      location: { _latitude: -20.0652169, _longitude: 57.5501712 },
    },
    {
      id: '9257869343',
      location: { _latitude: -19.9874755, _longitude: 57.619794 },
    },
    {
      location: { _latitude: -20.0694445, _longitude: 57.5490378 },
      id: '9257872240',
    },
    {
      id: '9257877527',
      location: { _latitude: -19.9868148, _longitude: 57.6010915 },
    },
    {
      id: '9257877902',
      location: { _latitude: -20.04551, _longitude: 57.554283 },
    },
    {
      id: '9257877903',
      location: { _latitude: -19.9868372, _longitude: 57.6023184 },
    },
    {
      location: { _latitude: -20.1591295, _longitude: 57.5115529 },
      name: 'Plaine Verte',
      id: '9280652552',
    },
    {
      id: '9280769274',
      location: { _latitude: -20.2385822, _longitude: 57.4976197 },
    },
    {
      id: '9280769782',
      name: 'Les Allées d’Helvétia',
      location: { _latitude: -20.223769, _longitude: 57.5222679 },
    },
    {
      id: '9288264877',
      location: { _latitude: -20.007145, _longitude: 57.558163 },
    },
    {
      location: { _latitude: -20.281501, _longitude: 57.4040023 },
      id: '9289867295',
    },
    {
      id: '9289970087',
      location: { _latitude: -20.2840975, _longitude: 57.490581 },
    },
    {
      id: '9289976368',
      location: { _latitude: -20.2913528, _longitude: 57.3638692 },
    },
    {
      location: { _latitude: -20.2983667, _longitude: 57.4007763 },
      id: '9289977824',
    },
    {
      id: '9289977825',
      location: { _latitude: -20.2861048, _longitude: 57.4032148 },
    },
    {
      id: '9289988831',
      location: { _latitude: -20.310189, _longitude: 57.4029609 },
    },
    {
      id: '9289995025',
      location: { _latitude: -20.2783472, _longitude: 57.3909255 },
    },
    {
      location: { _latitude: -20.4482685, _longitude: 57.5669756 },
      id: '9296830806',
    },
    {
      id: '9296870123',
      location: { _latitude: -20.4698075, _longitude: 57.344282 },
    },
    {
      location: { _latitude: -20.2520639, _longitude: 57.4919256 },
      id: '9349995517',
    },
    {
      location: { _latitude: -20.3024936, _longitude: 57.4750601 },
      id: '9460253081',
    },
    {
      name: 'Bus stop to SAFARI',
      id: '9865522259',
      location: { _latitude: -20.2962733, _longitude: 57.4067885 },
    },
    {
      id: '9893917463',
      location: { _latitude: -20.257694, _longitude: 57.4677643 },
    },
    {
      location: { _latitude: -20.2530199, _longitude: 57.4715611 },
      id: '9894020555',
    },
    {
      location: { _latitude: -20.2505923, _longitude: 57.4702442 },
      id: '9894020556',
    },
    {
      id: '9894020557',
      location: { _latitude: -20.2438139, _longitude: 57.4666195 },
    },
    {
      location: { _latitude: -20.2387578, _longitude: 57.464086 },
      id: '9894020558',
    },
    {
      id: '9894087801',
      location: { _latitude: -20.2538045, _longitude: 57.4712343 },
    },
    {
      id: '9894100620',
      location: { _latitude: -20.2586461, _longitude: 57.4708132 },
    },
    {
      id: '9894100621',
      location: { _latitude: -20.2568935, _longitude: 57.4723582 },
    },
    {
      id: '9894100622',
      location: { _latitude: -20.2658633, _longitude: 57.4644114 },
    },
    {
      id: '9894102473',
      location: { _latitude: -20.2567067, _longitude: 57.469336 },
    },
  ],
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function App() {
  const cameraRef = useRef<Camera | null>(null);

  const features: FeatureCollection<Geometry, GeoJsonProperties> = {
    type: 'FeatureCollection',
    features: data['bus-stops'].map((bstop) => ({
      type: 'Feature',
      id: `${bstop.id}`,
      geometry: {
        type: 'Point',
        coordinates: [bstop.location._longitude, bstop.location._latitude],
      },
      properties: {
        id: `${bstop.id}`,
      },
    })),
  };

  const zoomIn = async () => {
    await sleep(5000);

    cameraRef.current?.setCamera({
      ...cameraDefaultSettings,
      centerCoordinate: [57.3672399, -20.3066091],
      zoomLevel: 15,
    });

    await sleep(5000);

    cameraRef.current?.setCamera({
      ...cameraDefaultSettings,
      animationDuration: 5000,
      centerCoordinate: [57.5936994, -19.9912563],
      zoomLevel: 15,
    });
  };

  const cameraDefaultSettings: CameraStop = {
    animationDuration: 1000,
    bounds: { ne: [57.806426, -19.982901], sw: [57.307921, -20.525305] },
    padding: {
      paddingBottom: 40,
      paddingLeft: 40,
      paddingTop: 40,
      paddingRight: 40,
    },
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor="transparent" />
      <MapboxGL.MapView
        style={{ flex: 1 }}
        compassEnabled={true}
        compassViewPosition={1}
        compassFadeWhenNorth={false}
        compassViewMargins={{ y: 100, x: 10 }}
        attributionEnabled={true}
        attributionPosition={{ bottom: 5, left: 100 }}
        onDidFinishLoadingMap={zoomIn}
      >
        <MapboxGL.Camera ref={cameraRef} defaultSettings={cameraDefaultSettings} />
        <MapboxGL.ShapeSource
          id={`bus-stops`}
          shape={features}
          cluster={true}
          clusterRadius={5}
          onPress={(event) => {
            console.log(event.features.map((f) => f.id));
          }}
        >
          <MapboxGL.CircleLayer id={`layer`} style={{ circleColor: '#000', circleRadius: 5 }} />
        </MapboxGL.ShapeSource>
      </MapboxGL.MapView>
    </View>
  );
}
