const express = require('express');
const router = express.Router();
const multer = require('multer');

const auth = require('../../middleware/auth');

const userEditController = require('../controller/userEditController');


// Handle the image upload request
// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post('/upload-image', upload.single('profileImage'), userEditController.uploadImage);

router.get('/photo/:id', auth.isLogin, userEditController.photoupdateLoad);

router.post('/shortlist', auth.isLogin, userEditController.shortlist)

// From here the user profile Editing routes will be available

router.get('/basic-details/:id', auth.isLogin, userEditController.loadBasicEdit);
router.post('/basic-details/:id', auth.isLogin, userEditController.basicDetails);

router.get('/contact-details/:id', auth.isLogin, userEditController.loadContactDetails);
router.post('/contact-details/:id', auth.isLogin, userEditController.contactDetails)

router.get('/personal-details/:id', auth.isLogin, userEditController.loadPersonalDetails);
router.post('/personal-details/:id', auth.isLogin, userEditController.personalDetails);

router.get('/religion-details/:id', auth.isLogin, userEditController.loadReligionDetails);
router.post('/religion-details/:id', auth.isLogin, userEditController.religionDetails);


router.get('/family-details/:id', auth.isLogin, userEditController.loadfamilyDetails);
router.post('/family-details/:id', auth.isLogin, userEditController.familyDetails);

router.get('/education-details/:id', auth.isLogin, userEditController.loadEducationDetails);
router.post('/education-details/:id', auth.isLogin, userEditController.educationDetails);

router.get('/horoscope-details/:id', auth.isLogin, userEditController.loadHoroscopeDetails);
router.post('/horoscope-details/:id', auth.isLogin, userEditController.horoscopeDetails);

router.get('/life-style-details/:id', auth.isLogin, userEditController.loadLifeStyleDetails);
router.post('/life-style-details/:id', auth.isLogin, userEditController.lifeStyleDetails);

router.get('/professional-details/:id', auth.isLogin, userEditController.loadProfessionalDetails);
router.post('/professional-details/:id', auth.isLogin, userEditController.professionalDetails);



// edit for the phone updated


const religionData = [
    // HINDU
    {
        "id": "1",
        "name": "Hindu",
        "castealias": "Caste",
        "castes": [
            {
                "id": "1",
                "name": "Ad Dharmi"
            },
            {
                "id": "2",
                "name": "Adi Andhra"
            },
            {
                "id": "3",
                "name": "Adi Dravida"
            },
            {
                "id": "4",
                "name": "Adi-karnataka"
            },
            {
                "id": "5",
                "name": "Agarwal"
            },
            {
                "id": "6",
                "name": "Agnikula Kshatriya"
            },
            {
                "id": "7",
                "name": "Agri"
            },
            {
                "id": "8",
                "name": "Ahir Shimpi"
            },
            {
                "id": "9",
                "name": "Ahom"
            },
            {
                "id": "10",
                "name": "Ambalavasi"
            },
            {
                "id": "11",
                "name": "Arekatica"
            },
            {
                "id": "12",
                "name": "Arora"
            },
            {
                "id": "13",
                "name": "Arunthathiyar"
            },
            {
                "id": "14",
                "name": "Arya Vysya"
            },
            {
                "id": "15",
                "name": "Ayyaraka"
            },
            {
                "id": "16",
                "name": "Badaga"
            },
            {
                "id": "17",
                "name": "Bagdi"
            },
            {
                "id": "18",
                "name": "Baidya"
            },
            {
                "id": "19",
                "name": "Baishnab"
            },
            {
                "id": "20",
                "name": "Baishya"
            },
            {
                "id": "21",
                "name": "Bajantri"
            },
            {
                "id": "22",
                "name": "Balija"
            },
            {
                "id": "23",
                "name": "Banayat Oriya"
            },
            {
                "id": "24",
                "name": "Banik"
            },
            {
                "id": "25",
                "name": "Baniya"
            },
            {
                "id": "26",
                "name": "Baniya - Bania"
            },
            {
                "id": "27",
                "name": "Baniya - Kumuti"
            },
            {
                "id": "28",
                "name": "Banjara"
            },
            {
                "id": "29",
                "name": "Barai"
            },
            {
                "id": "30",
                "name": "Bari"
            },
            {
                "id": "31",
                "name": "Baria"
            },
            {
                "id": "32",
                "name": "Barujibi"
            },
            {
                "id": "33",
                "name": "Besta"
            },
            {
                "id": "34",
                "name": "Bhandari"
            },
            {
                "id": "35",
                "name": "Bhatia"
            },
            {
                "id": "36",
                "name": "Bhatraju"
            },
            {
                "id": "37",
                "name": "Bhavasar Kshatriya"
            },
            {
                "id": "38",
                "name": "Bhoi"
            },
            {
                "id": "39",
                "name": "Bhovi"
            },
            {
                "id": "40",
                "name": "Bhoyar"
            },
            {
                "id": "41",
                "name": "Billava"
            },
            {
                "id": "42",
                "name": "Bishnoi/Vishnoi"
            },
            {
                "id": "43",
                "name": "Bondili"
            },
            {
                "id": "44",
                "name": "Boyer"
            },
            {
                "id": "45",
                "name": "Brahmbatt"
            },
            {
                "id": "46",
                "name": "Brahmin"
            },
            {
                "id": "47",
                "name": "Brahmin - Anavil"
            },
            {
                "id": "48",
                "name": "Brahmin - Audichya"
            },
            {
                "id": "49",
                "name": "Brahmin - Barendra"
            },
            {
                "id": "50",
                "name": "Brahmin - Bhatt"
            },
            {
                "id": "51",
                "name": "Brahmin - Bhumihar"
            },
            {
                "id": "52",
                "name": "Brahmin - Daivadnya"
            },
            {
                "id": "53",
                "name": "Brahmin - Danua"
            },
            {
                "id": "54",
                "name": "Brahmin - Deshastha"
            },
            {
                "id": "55",
                "name": "Brahmin - Dhiman"
            },
            {
                "id": "56",
                "name": "Brahmin - Dravida"
            },
            {
                "id": "57",
                "name": "Brahmin - Embrandiri"
            },
            {
                "id": "58",
                "name": "Brahmin - Garhwali"
            },
            {
                "id": "59",
                "name": "Brahmin - Gaur"
            },
            {
                "id": "60",
                "name": "Brahmin - Goswami"
            },
            {
                "id": "61",
                "name": "Brahmin - Gujar Gaur"
            },
            {
                "id": "62",
                "name": "Brahmin - Gurukkal"
            },
            {
                "id": "63",
                "name": "Brahmin - Halua"
            },
            {
                "id": "64",
                "name": "Brahmin - Havyaka"
            },
            {
                "id": "65",
                "name": "Brahmin - Hoysala"
            },
            {
                "id": "66",
                "name": "Brahmin - Iyengar"
            },
            {
                "id": "67",
                "name": "Brahmin - Iyer"
            },
            {
                "id": "68",
                "name": "Brahmin - Jangid"
            },
            {
                "id": "69",
                "name": "Brahmin - Jhadua"
            },
            {
                "id": "70",
                "name": "Brahmin - Jyotish"
            },
            {
                "id": "71",
                "name": "Brahmin - Kanyakubj"
            },
            {
                "id": "72",
                "name": "Brahmin - Karhade"
            },
            {
                "id": "73",
                "name": "Brahmin - Khandelwal"
            },
            {
                "id": "74",
                "name": "Brahmin - Kokanastha"
            },
            {
                "id": "75",
                "name": "Brahmin - Kota"
            },
            {
                "id": "76",
                "name": "Brahmin - Kulin"
            },
            {
                "id": "77",
                "name": "Brahmin - Kumoani"
            },
            {
                "id": "78",
                "name": "Brahmin - Madhwa"
            },
            {
                "id": "79",
                "name": "Brahmin - Maithil"
            },
            {
                "id": "80",
                "name": "Brahmin - Modh"
            },
            {
                "id": "81",
                "name": "Brahmin - Mohyal"
            },
            {
                "id": "82",
                "name": "Brahmin - Nagar"
            },
            {
                "id": "83",
                "name": "Brahmin - Namboodiri"
            },
            {
                "id": "84",
                "name": "Brahmin - Narmadiya"
            },
            {
                "id": "85",
                "name": "Brahmin - Niyogi"
            },
            {
                "id": "86",
                "name": "Brahmin - Paliwal"
            },
            {
                "id": "87",
                "name": "Brahmin - Panda"
            },
            {
                "id": "88",
                "name": "Brahmin - Pandit"
            },
            {
                "id": "89",
                "name": "Brahmin - Pareek"
            },
            {
                "id": "90",
                "name": "Brahmin - Pushkarna"
            },
            {
                "id": "91",
                "name": "Brahmin - Rarhi"
            },
            {
                "id": "92",
                "name": "Brahmin - Rigvedi"
            },
            {
                "id": "93",
                "name": "Brahmin - Rudraj"
            },
            {
                "id": "94",
                "name": "Brahmin - Sakaldwipi"
            },
            {
                "id": "95",
                "name": "Brahmin - Sanadya"
            },
            {
                "id": "96",
                "name": "Brahmin - Sanketi"
            },
            {
                "id": "97",
                "name": "Brahmin - Saraswat"
            },
            {
                "id": "98",
                "name": "Brahmin - Saryuparin"
            },
            {
                "id": "99",
                "name": "Brahmin - Shivhalli"
            },
            {
                "id": "100",
                "name": "Brahmin - Shrimali"
            },
            {
                "id": "101",
                "name": "Brahmin - Sikhwal"
            },
            {
                "id": "102",
                "name": "Brahmin - Smartha"
            },
            {
                "id": "103",
                "name": "Brahmin - Sri Vishnava"
            },
            {
                "id": "104",
                "name": "Brahmin - Stanika"
            },
            {
                "id": "105",
                "name": "Brahmin - Tyagi"
            },
            {
                "id": "106",
                "name": "Brahmin - Vaidiki"
            },
            {
                "id": "107",
                "name": "Brahmin - Vaikhanasa"
            },
            {
                "id": "108",
                "name": "Brahmin - Velanadu"
            },
            {
                "id": "109",
                "name": "Brahmin - Vyas"
            },
            {
                "id": "110",
                "name": "Brajastha Maithil"
            },
            {
                "id": "111",
                "name": "Brajastha Maithil"
            },
            {
                "id": "112",
                "name": "Bunt (Shetty)"
            },
            {
                "id": "113",
                "name": "CKP"
            },
            {
                "id": "114",
                "name": "Chalawadi and Holeya"
            },
            {
                "id": "115",
                "name": "Chambhar"
            },
            {
                "id": "116",
                "name": "Chandravanshi Kahar"
            },
            {
                "id": "117",
                "name": "Chasa"
            },
            {
                "id": "118",
                "name": "Chattada Sri Vaishnava"
            },
            {
                "id": "119",
                "name": "Chaudary"
            },
            {
                "id": "120",
                "name": "Chaurasia"
            },
            {
                "id": "121",
                "name": "Chennadasar"
            },
            {
                "id": "122",
                "name": "Chettiar"
            },
            {
                "id": "123",
                "name": "Chhetri"
            },
            {
                "id": "124",
                "name": "Chippolu (Mera)"
            },
            {
                "id": "125",
                "name": "Coorgi"
            },
            {
                "id": "126",
                "name": "Devadiga"
            },
            {
                "id": "127",
                "name": "Devandra Kula Vellalar"
            },
            {
                "id": "128",
                "name": "Devang Koshthi"
            },
            {
                "id": "129",
                "name": "Devanga"
            },
            {
                "id": "130",
                "name": "Devrukhe Brahmin"
            },
            {
                "id": "131",
                "name": "Dhangar"
            },
            {
                "id": "132",
                "name": "Dheevara"
            },
            {
                "id": "133",
                "name": "Dhiman"
            },
            {
                "id": "134",
                "name": "Dhoba"
            },
            {
                "id": "135",
                "name": "Dhobi"
            },
            {
                "id": "136",
                "name": "Dhor / Kakkayya"
            },
            {
                "id": "137",
                "name": "Dommala"
            },
            {
                "id": "138",
                "name": "Dumal"
            },
            {
                "id": "139",
                "name": "Dusadh (Paswan)"
            },
            {
                "id": "140",
                "name": "Ediga"
            },
            {
                "id": "141",
                "name": "Ezhava"
            },
            {
                "id": "142",
                "name": "Ezhuthachan"
            },
            {
                "id": "143",
                "name": "Gabit"
            },
            {
                "id": "144",
                "name": "Ganda"
            },
            {
                "id": "145",
                "name": "Gandla"
            },
            {
                "id": "146",
                "name": "Ganiga"
            },
            {
                "id": "147",
                "name": "Garhwali"
            },
            {
                "id": "148",
                "name": "Gatti"
            },
            {
                "id": "149",
                "name": "Gavara"
            },
            {
                "id": "150",
                "name": "Gawali"
            },
            {
                "id": "151",
                "name": "Ghisadi"
            },
            {
                "id": "152",
                "name": "Ghumar"
            },
            {
                "id": "153",
                "name": "Goala"
            },
            {
                "id": "154",
                "name": "Goan"
            },
            {
                "id": "155",
                "name": "Gomantak"
            },
            {
                "id": "156",
                "name": "Gondhali"
            },
            {
                "id": "157",
                "name": "Goud"
            },
            {
                "id": "158",
                "name": "Gounder"
            },
            {
                "id": "159",
                "name": "Gowda"
            },
            {
                "id": "160",
                "name": "Gramani"
            },
            {
                "id": "161",
                "name": "Gudia"
            },
            {
                "id": "162",
                "name": "Gujjar"
            },
            {
                "id": "163",
                "name": "Gupta"
            },
            {
                "id": "164",
                "name": "Guptan"
            },
            {
                "id": "165",
                "name": "Gurav"
            },
            {
                "id": "166",
                "name": "Gurjar"
            },
            {
                "id": "167",
                "name": "Halba Koshti"
            },
            {
                "id": "168",
                "name": "Helava"
            },
            {
                "id": "169",
                "name": "Hugar (Jeer)"
            },
            {
                "id": "170",
                "name": "Intercaste"
            },
            {
                "id": "171",
                "name": "Irani"
            },
            {
                "id": "172",
                "name": "Jaalari"
            },
            {
                "id": "173",
                "name": "Jaiswal"
            },
            {
                "id": "174",
                "name": "Jandra"
            },
            {
                "id": "175",
                "name": "Jangam"
            },
            {
                "id": "176",
                "name": "Jangra - Brahmin"
            },
            {
                "id": "177",
                "name": "Jat"
            },
            {
                "id": "178",
                "name": "Jatav"
            },
            {
                "id": "179",
                "name": "Jetty/Malla"
            },
            {
                "id": "180",
                "name": "Jogi (Nath)"
            },
            {
                "id": "181",
                "name": "Kachara"
            },
            {
                "id": "182",
                "name": "Kadava Patel"
            },
            {
                "id": "183",
                "name": "Kahar"
            },
            {
                "id": "184",
                "name": "Kaibarta"
            },
            {
                "id": "185",
                "name": "Kalal"
            },
            {
                "id": "186",
                "name": "Kalanji"
            },
            {
                "id": "187",
                "name": "Kalar"
            },
            {
                "id": "188",
                "name": "Kalinga"
            },
            {
                "id": "189",
                "name": "Kalinga Vysya"
            },
            {
                "id": "190",
                "name": "Kalita"
            },
            {
                "id": "191",
                "name": "Kalwar"
            },
            {
                "id": "192",
                "name": "Kamboj"
            },
            {
                "id": "193",
                "name": "Kamma"
            },
            {
                "id": "194",
                "name": "Kansari"
            },
            {
                "id": "195",
                "name": "Kapu"
            },
            {
                "id": "196",
                "name": "Karana"
            },
            {
                "id": "197",
                "name": "Karmakar"
            },
            {
                "id": "198",
                "name": "Karuneegar"
            },
            {
                "id": "199",
                "name": "Kasar"
            },
            {
                "id": "200",
                "name": "Kashyap"
            },
            {
                "id": "201",
                "name": "Katiya"
            },
            {
                "id": "202",
                "name": "Kavuthiyya/Ezhavathy"
            },
            {
                "id": "203",
                "name": "Kayastha"
            },
            {
                "id": "204",
                "name": "Khandayat"
            },
            {
                "id": "205",
                "name": "Khandelwal"
            },
            {
                "id": "206",
                "name": "Kharwa"
            },
            {
                "id": "207",
                "name": "Kharwar"
            },
            {
                "id": "208",
                "name": "Khatri"
            },
            {
                "id": "209",
                "name": "Kirar"
            },
            {
                "id": "210",
                "name": "Kokanastha Maratha"
            },
            {
                "id": "211",
                "name": "Koli"
            },
            {
                "id": "212",
                "name": "Koli Mahadev"
            },
            {
                "id": "213",
                "name": "Koli Patel"
            },
            {
                "id": "214",
                "name": "Kongu Vellala Gounder"
            },
            {
                "id": "215",
                "name": "Konkani"
            },
            {
                "id": "216",
                "name": "Korama"
            },
            {
                "id": "217",
                "name": "Kori"
            },
            {
                "id": "218",
                "name": "Kosthi"
            },
            {
                "id": "219",
                "name": "Krishnavaka"
            },
            {
                "id": "220",
                "name": "Kshatriya"
            },
            {
                "id": "221",
                "name": "Kudumbi"
            },
            {
                "id": "222",
                "name": "Kulal"
            },
            {
                "id": "223",
                "name": "Kulalar"
            },
            {
                "id": "224",
                "name": "Kulita"
            },
            {
                "id": "225",
                "name": "Kumawat"
            },
            {
                "id": "226",
                "name": "Kumbhakar"
            },
            {
                "id": "227",
                "name": "Kumbhar"
            },
            {
                "id": "228",
                "name": "Kumhar"
            },
            {
                "id": "229",
                "name": "Kummari"
            },
            {
                "id": "230",
                "name": "Kunbi"
            },
            {
                "id": "231",
                "name": "Kuravan"
            },
            {
                "id": "232",
                "name": "Kurmi"
            },
            {
                "id": "233",
                "name": "Kurmi Kshatriya"
            },
            {
                "id": "234",
                "name": "Kuruba"
            },
            {
                "id": "235",
                "name": "Kuruhina Shetty"
            },
            {
                "id": "236",
                "name": "Kurumbar"
            },
            {
                "id": "237",
                "name": "Kushwaha (Koiri)"
            },
            {
                "id": "238",
                "name": "Kutchi"
            },
            {
                "id": "239",
                "name": "Lambadi"
            },
            {
                "id": "240",
                "name": "Leva patel"
            },
            {
                "id": "241",
                "name": "Leva patil"
            },
            {
                "id": "242",
                "name": "Lingayath"
            },
            {
                "id": "243",
                "name": "Lodhi Rajput"
            },
            {
                "id": "244",
                "name": "Lohana"
            },
            {
                "id": "245",
                "name": "Lohar"
            },
            {
                "id": "246",
                "name": "Loniya"
            },
            {
                "id": "247",
                "name": "Lubana"
            },
            {
                "id": "248",
                "name": "Madiga"
            },
            {
                "id": "249",
                "name": "Mahajan"
            },
            {
                "id": "250",
                "name": "Mahar"
            },
            {
                "id": "251",
                "name": "Mahendra"
            },
            {
                "id": "252",
                "name": "Maheshwari"
            },
            {
                "id": "253",
                "name": "Mahishya"
            },
            {
                "id": "254",
                "name": "Majabi"
            },
            {
                "id": "255",
                "name": "Mala"
            },
            {
                "id": "256",
                "name": "Mali"
            },
            {
                "id": "257",
                "name": "Malla"
            },
            {
                "id": "258",
                "name": "Malviya Brahmin"
            },
            {
                "id": "259",
                "name": "Mangalorean"
            },
            {
                "id": "260",
                "name": "Manipuri"
            },
            {
                "id": "261",
                "name": "Mapila"
            },
            {
                "id": "262",
                "name": "Maratha"
            },
            {
                "id": "263",
                "name": "Maruthuvar"
            },
            {
                "id": "264",
                "name": "Matang"
            },
            {
                "id": "265",
                "name": "Mathur"
            },
            {
                "id": "266",
                "name": "Maurya / Shakya"
            },
            {
                "id": "267",
                "name": "Meena"
            },
            {
                "id": "268",
                "name": "Meenavar"
            },
            {
                "id": "269",
                "name": "Mehra"
            },
            {
                "id": "270",
                "name": "Meru Darji"
            },
            {
                "id": "271",
                "name": "Mochi"
            },
            {
                "id": "272",
                "name": "Modak"
            },
            {
                "id": "273",
                "name": "Mogaveera"
            },
            {
                "id": "274",
                "name": "Mudaliyar"
            },
            {
                "id": "275",
                "name": "Mudiraj"
            },
            {
                "id": "276",
                "name": "Mukkulathor"
            },
            {
                "id": "277",
                "name": "Munnuru Kapu"
            },
            {
                "id": "278",
                "name": "Muthuraja"
            },
            {
                "id": "279",
                "name": "Naagavamsam"
            },
            {
                "id": "280",
                "name": "Nadar"
            },
            {
                "id": "281",
                "name": "Nagaralu"
            },
            {
                "id": "282",
                "name": "Nai"
            },
            {
                "id": "283",
                "name": "Naicker"
            },
            {
                "id": "284",
                "name": "Naidu"
            },
            {
                "id": "285",
                "name": "Naik"
            },
            {
                "id": "286",
                "name": "Nair"
            },
            {
                "id": "287",
                "name": "Nambiar"
            },
            {
                "id": "288",
                "name": "Namosudra"
            },
            {
                "id": "289",
                "name": "Napit"
            },
            {
                "id": "290",
                "name": "Nayaka"
            },
            {
                "id": "291",
                "name": "Neeli"
            },
            {
                "id": "292",
                "name": "Nepali"
            },
            {
                "id": "293",
                "name": "Nhavi"
            },
            {
                "id": "294",
                "name": "Oswal"
            },
            {
                "id": "295",
                "name": "Otari"
            },
            {
                "id": "296",
                "name": "Padmasali"
            },
            {
                "id": "297",
                "name": "Pal"
            },
            {
                "id": "298",
                "name": "Panchal"
            },
            {
                "id": "299",
                "name": "Pandaram"
            },
            {
                "id": "300",
                "name": "Panicker"
            },
            {
                "id": "301",
                "name": "Parkava Kulam"
            },
            {
                "id": "302",
                "name": "Parsi"
            },
            {
                "id": "303",
                "name": "Partraj"
            },
            {
                "id": "304",
                "name": "Pasi"
            },
            {
                "id": "305",
                "name": "Patel"
            },
            {
                "id": "306",
                "name": "Pathare Prabhu"
            },
            {
                "id": "307",
                "name": "Patnaick"
            },
            {
                "id": "308",
                "name": "Patra"
            },
            {
                "id": "309",
                "name": "Perika"
            },
            {
                "id": "310",
                "name": "Pillai"
            },
            {
                "id": "311",
                "name": "Poosala"
            },
            {
                "id": "312",
                "name": "Porwal"
            },
            {
                "id": "313",
                "name": "Prajapati"
            },
            {
                "id": "314",
                "name": "Raigar"
            },
            {
                "id": "315",
                "name": "Rajaka"
            },
            {
                "id": "316",
                "name": "Rajastani"
            },
            {
                "id": "317",
                "name": "Rajbhar"
            },
            {
                "id": "318",
                "name": "Rajbonshi"
            },
            {
                "id": "319",
                "name": "Rajpurohit"
            },
            {
                "id": "320",
                "name": "Rajput"
            },
            {
                "id": "321",
                "name": "Ramanandi"
            },
            {
                "id": "322",
                "name": "Ramdasia"
            },
            {
                "id": "323",
                "name": "Ramgariah"
            },
            {
                "id": "324",
                "name": "Ramoshi"
            },
            {
                "id": "325",
                "name": "Ravidasia"
            },
            {
                "id": "326",
                "name": "Rawat"
            },
            {
                "id": "327",
                "name": "Reddy"
            },
            {
                "id": "328",
                "name": "Relli"
            },
            {
                "id": "329",
                "name": "Ror"
            },
            {
                "id": "330",
                "name": "SC"
            },
            {
                "id": "331",
                "name": "SKP"
            },
            {
                "id": "332",
                "name": "ST"
            },
            {
                "id": "333",
                "name": "Sadgope"
            },
            {
                "id": "334",
                "name": "Saha"
            },
            {
                "id": "335",
                "name": "Sahu"
            },
            {
                "id": "336",
                "name": "Saini"
            },
            {
                "id": "337",
                "name": "Saliya"
            },
            {
                "id": "338",
                "name": "Sathwara"
            },
            {
                "id": "339",
                "name": "Savji"
            },
            {
                "id": "340",
                "name": "Senai Thalaivar"
            },
            {
                "id": "341",
                "name": "Senguntha Mudaliyar"
            },
            {
                "id": "342",
                "name": "Settibalija"
            },
            {
                "id": "343",
                "name": "Shimpi"
            },
            {
                "id": "344",
                "name": "Sindhi"
            },
            {
                "id": "345",
                "name": "Sindhi-Amil"
            },
            {
                "id": "346",
                "name": "Sindhi-Baibhand"
            },
            {
                "id": "347",
                "name": "Sindhi-Bhanusali"
            },
            {
                "id": "348",
                "name": "Sindhi-Bhatia"
            },
            {
                "id": "349",
                "name": "Sindhi-Chhapru"
            },
            {
                "id": "350",
                "name": "Sindhi-Dadu"
            },
            {
                "id": "351",
                "name": "Sindhi-Hyderabadi"
            },
            {
                "id": "352",
                "name": "Sindhi-Larai"
            },
            {
                "id": "353",
                "name": "Sindhi-Larkana"
            },
            {
                "id": "354",
                "name": "Sindhi-Lohana"
            },
            {
                "id": "355",
                "name": "Sindhi-Rohiri"
            },
            {
                "id": "356",
                "name": "Sindhi-Sahiti"
            },
            {
                "id": "357",
                "name": "Sindhi-Sakkhar"
            },
            {
                "id": "358",
                "name": "Sindhi-Sehwani"
            },
            {
                "id": "359",
                "name": "Sindhi-Shikarpuri"
            },
            {
                "id": "360",
                "name": "Sindhi-Thatai"
            },
            {
                "id": "361",
                "name": "Sonar"
            },
            {
                "id": "362",
                "name": "Soni"
            },
            {
                "id": "363",
                "name": "Sourashtra"
            },
            {
                "id": "364",
                "name": "Sozhiya Vellalar"
            },
            {
                "id": "365",
                "name": "Srisayana"
            },
            {
                "id": "366",
                "name": "Sugali (Naika)"
            },
            {
                "id": "367",
                "name": "Sunari"
            },
            {
                "id": "368",
                "name": "Sundhi"
            },
            {
                "id": "369",
                "name": "Surya Balija"
            },
            {
                "id": "370",
                "name": "Suthar"
            },
            {
                "id": "371",
                "name": "Swakula Sali"
            },
            {
                "id": "372",
                "name": "Tamboli"
            },
            {
                "id": "373",
                "name": "Tanti"
            },
            {
                "id": "374",
                "name": "Tantubai"
            },
            {
                "id": "375",
                "name": "Telaga"
            },
            {
                "id": "376",
                "name": "Teli"
            },
            {
                "id": "377",
                "name": "Thakkar"
            },
            {
                "id": "378",
                "name": "Thakore"
            },
            {
                "id": "379",
                "name": "Thakur"
            },
            {
                "id": "380",
                "name": "Thigala"
            },
            {
                "id": "381",
                "name": "Thiyya"
            },
            {
                "id": "382",
                "name": "Tili"
            },
            {
                "id": "383",
                "name": "Togata"
            },
            {
                "id": "384",
                "name": "Tonk Kshatriya"
            },
            {
                "id": "385",
                "name": "Turupu Kapu"
            },
            {
                "id": "386",
                "name": "Uppara"
            },
            {
                "id": "387",
                "name": "Urali Gounder"
            },
            {
                "id": "388",
                "name": "Urs"
            },
            {
                "id": "389",
                "name": "Vada Balija"
            },
            {
                "id": "390",
                "name": "Vaddera"
            },
            {
                "id": "391",
                "name": "Vaish"
            },
            {
                "id": "392",
                "name": "Vaishnav"
            },
            {
                "id": "393",
                "name": "Vaishnava"
            },
            {
                "id": "394",
                "name": "Vaishya"
            },
            {
                "id": "395",
                "name": "Vaishya Vani"
            },
            {
                "id": "396",
                "name": "Valluvan"
            },
            {
                "id": "397",
                "name": "Valmiki"
            },
            {
                "id": "398",
                "name": "Vania"
            },
            {
                "id": "399",
                "name": "Vanika Vyshya"
            },
            {
                "id": "400",
                "name": "Vaniya"
            },
            {
                "id": "401",
                "name": "Vanjara"
            },
            {
                "id": "402",
                "name": "Vanjari"
            },
            {
                "id": "403",
                "name": "Vankar"
            },
            {
                "id": "404",
                "name": "Vannar"
            },
            {
                "id": "405",
                "name": "Vannia Kula Kshatriyar"
            },
            {
                "id": "406",
                "name": "Variar"
            },
            {
                "id": "407",
                "name": "Varshney"
            },
            {
                "id": "408",
                "name": "Veera Saivam"
            },
            {
                "id": "409",
                "name": "Velaan"
            },
            {
                "id": "410",
                "name": "Velama"
            },
            {
                "id": "411",
                "name": "Vellalar"
            },
            {
                "id": "412",
                "name": "Veluthedathu Nair"
            },
            {
                "id": "413",
                "name": "Vettuva Gounder"
            },
            {
                "id": "414",
                "name": "Vilakkithala Nair"
            },
            {
                "id": "415",
                "name": "Viswabrahmin"
            },
            {
                "id": "416",
                "name": "Viswakarma"
            },
            {
                "id": "417",
                "name": "Vokkaliga"
            },
            {
                "id": "418",
                "name": "Vysya"
            },
            {
                "id": "419",
                "name": "Yadav"
            },
            {
                "id": "420",
                "name": "Yellapu"
            },
            {
                "id": "421",
                "name": "Others"
            },
        ]
    },
    // Muslim
    {
        "id": "2",
        "name": "Muslim",
        "castealias": "Sect",
        "castes": [
          
            {
                "id": "1",
                "name": "Muslim - Ansari"
            },
            {
                "id": "2",
                "name": "Muslim - Arain"
            },
            {
                "id": "3",
                "name": "Muslim - Awan"
            },
            {
                "id": "4",
                "name": "Alavi - Bohra"
            },
            {
                "id": "5",
                "name": "Muslim - Dakhini"
            },
            {
                "id": "6",
                "name": "Muslim - Dudekula"
            },
            {
                "id": "7",
                "name": "Muslim - Hanafi"
            },
            {
                "id": "8",
                "name": "Muslim - Jat"
            },
            {
                "id": "9",
                "name": "Muslim - Khoja"
            },
            {
                "id": "10",
                "name": "Muslim - Labbay"
            },
            {
                "id": "11",
                "name": "Muslim - Malik"
            },
            {
                "id": "12",
                "name": "Muslim - Mappila"
            },
            {
                "id": "13",
                "name": "Muslim - Marakayar"
            },
            {
                "id": "14",
                "name": "Muslim - Memon"
            },
            {
                "id": "15",
                "name": "Muslim - Mughal"
            },
            {
                "id": "16",
                "name": "Muslim - Pathan"
            },
            {
                "id": "17",
                "name": "Muslim - Qureshi"
            },
            {
                "id": "18",
                "name": "Muslim - Rajput"
            },
            {
                "id": "19",
                "name": "Muslim - Rowther"
            },
            {
                "id": "20",
                "name": "Muslim - Shafi"
            },
            {
                "id": "21",
                "name": "Muslim - Sheikh"
            },
            {
                "id": "22",
                "name": "Muslim - Siddiqui"
            },
            {
                "id": "23",
                "name": "Muslim - Syed"
            },
            {
                "id": "24",
                "name": "Muslim - UnSpecified"
            },
            {
                "id": "25",
                "name": "Others"
            }
        ]
    },
    // Muslim sia
    {
        "id": "3",
        "name": "Muslim - Shia",
        "castealias": "Sect",
        "castes": [
            {
                "id": "1",
                "name": "Shia Isma'ilis (Seveners)"
            },
            {
                "id": "2",
                "name": "Shia Ithna Asharis (Twelvers)"
            },
            {
                "id": "3",
                "name": "Shia Zaidis (Fivers)"
            },
            {
                "id": "4",
                "name": "Muslim - Ansari"
            },
            {
                "id": "5",
                "name": "Muslim - Arain"
            },
            {
                "id": "6",
                "name": "Muslim - Awan"
            },
            {
                "id": "7",
                "name": "Alavi - Bohra"
            },
            {
                "id": "8",
                "name": "Muslim - Dakhini"
            },
            {
                "id": "9",
                "name": "Muslim - Dudekula"
            },
            {
                "id": "10",
                "name": "Muslim - Hanafi"
            },
            {
                "id": "11",
                "name": "Muslim - Jat"
            },
            {
                "id": "12",
                "name": "Muslim - Khoja"
            },
            {
                "id": "13",
                "name": "Muslim - Labbay"
            },
            {
                "id": "14",
                "name": "Muslim - Malik"
            },
            {
                "id": "15",
                "name": "Muslim - Mappila"
            },
            {
                "id": "16",
                "name": "Muslim - Marakayar"
            },
            {
                "id": "17",
                "name": "Muslim - Memon"
            },
            {
                "id": "18",
                "name": "Muslim - Mughal"
            },
            {
                "id": "19",
                "name": "Muslim - Pathan"
            },
            {
                "id": "20",
                "name": "Muslim - Qureshi"
            },
            {
                "id": "21",
                "name": "Muslim - Rajput"
            },
            {
                "id": "22",
                "name": "Muslim - Rowther"
            },
            {
                "id": "23",
                "name": "Muslim - Shafi"
            },
            {
                "id": "24",
                "name": "Muslim - Sheikh"
            },
            {
                "id": "25",
                "name": "Muslim - Siddiqui"
            },
            {
                "id": "26",
                "name": "Muslim - Syed"
            },
            {
                "id": "27",
                "name": "Muslim - UnSpecified"
            },
            {
                "id": "28",
                "name": "Others"
            }
        ]
    },
    // suni
    {
        "id": "4",
        "name": "Muslim - Sunni",
        "castealias": "Sect",
        "castes": [
           
            {
                "id": "1",
                "name": "Sunni Hanabali"
            },
            {
                "id": "2",
                "name": "Sunni Hanafi"
            },
            {
                "id": "3",
                "name": "Sunni Maliki"
            },
            {
                "id": "4",
                "name": "Sunni Shafii"
            },
            {
                "id": "5",
                "name": "Muslim - Ansari"
            },
            {
                "id": "6",
                "name": "Muslim - Arain"
            },
            {
                "id": "7",
                "name": "Muslim - Awan"
            },
            {
                "id": "8",
                "name": "Alavi - Bohra"
            },
            {
                "id": "9",
                "name": "Muslim - Dakhini"
            },
            {
                "id": "10",
                "name": "Muslim - Dudekula"
            },
            {
                "id": "11",
                "name": "Muslim - Hanafi"
            },
            {
                "id": "12",
                "name": "Muslim - Jat"
            },
            {
                "id": "13",
                "name": "Muslim - Khoja"
            },
            {
                "id": "14",
                "name": "Muslim - Labbay"
            },
            {
                "id": "15",
                "name": "Muslim - Malik"
            },
            {
                "id": "16",
                "name": "Muslim - Mappila"
            },
            {
                "id": "17",
                "name": "Muslim - Marakayar"
            },
            {
                "id": "18",
                "name": "Muslim - Memon"
            },
            {
                "id": "19",
                "name": "Muslim - Mughal"
            },
            {
                "id": "20",
                "name": "Muslim - Pathan"
            },
            {
                "id": "21",
                "name": "Muslim - Qureshi"
            },
            {
                "id": "22",
                "name": "Muslim - Rajput"
            },
            {
                "id": "23",
                "name": "Muslim - Rowther"
            },
            {
                "id": "24",
                "name": "Muslim - Shafi"
            },
            {
                "id": "25",
                "name": "Muslim - Sheikh"
            },
            {
                "id": "26",
                "name": "Muslim - Siddiqui"
            },
            {
                "id": "27",
                "name": "Muslim - Syed"
            },
            {
                "id": "28",
                "name": "Muslim - UnSpecified"
            },
            {
                "id": "29",
                "name": "Others"
            }
        ]
    },
    // Christans
    {
        "id": "6",
        "name": "Christian",
        "castealias": "Denomination",
        "castes": [
            {
                "id": "1",
                "name": "Adventist"
            },
            {
                "id": "2",
                "name": "Anglican / Episcopal"
            },
            {
                "id": "3",
                "name": "Apostolic"
            },
            {
                "id": "4",
                "name": "Assyrian"
            },
            {
                "id": "5",
                "name": "Assembly of God (AG)"
            },
            {
                "id": "6",
                "name": "Baptist"
            },
            {
                "id": "7",
                "name": "Calvinist"
            },
            {
                "id": "8",
                "name": "Christian - Born Again"
            },
            {
                "id": "9",
                "name": "Christian - Bretheren"
            },
            {
                "id": "10",
                "name": "Christian - Church of South India"
            },
            {
                "id": "11",
                "name": "Christian - Evangelist"
            },
            {
                "id": "12",
                "name": "Christian - Jacobite"
            },
            {
                "id": "13",
                "name": "Christian - Knanaya"
            },
            {
                "id": "14",
                "name": "Christian - Knanaya Catholic"
            },
            {
                "id": "15",
                "name": "Christian - Knanaya Jacobite"
            },
            {
                "id": "16",
                "name": "Christian - Latin Catholic"
            },
            {
                "id": "17",
                "name": "Christian - Malankara"
            },
            {
                "id": "18",
                "name": "Christian - Marthoma"
            },
            {
                "id": "19",
                "name": "Christian - Pentacost"
            },
            {
                "id": "20",
                "name": "Christian - Roman Catholic"
            },
            {
                "id": "21",
                "name": "Christian - Syrian Catholic"
            },
            {
                "id": "22",
                "name": "Christian - Syrian Jacobite"
            },
            {
                "id": "23",
                "name": "Christian - Syrian Orthodox"
            },
            {
                "id": "24",
                "name": "Christian - Syro Malabar"
            },
            {
                "id": "25",
                "name": "Christian - Unspecified"
            },
            {
                "id": "26",
                "name": "Church of God"
            },
            {
                "id": "27",
                "name": "Church of Christ"
            },
            {
                "id": "28",
                "name": "Church of North India"
            },
            {
                "id": "29",
                "name": "Congregational"
            },
            {
                "id": "30",
                "name": "East Indian Catholic"
            },
            {
                "id": "31",
                "name": "Jehovah's Witnesses"
            },
            {
                "id": "32",
                "name": "Latter day saints"
            },
            {
                "id": "33",
                "name": "Lutheran"
            },
            {
                "id": "34",
                "name": "Melkite"
            },
            {
                "id": "35",
                "name": "Malabar Independent Syrian Church"
            },
            {
                "id": "36",
                "name": "Mennonite"
            },
            {
                "id": "37",
                "name": "Methodist"
            },
            {
                "id": "38",
                "name": "Moravian"
            },
            {
                "id": "39",
                "name": "Protestant"
            },
            {
                "id": "40",
                "name": "Presbyterian"
            },
            {
                "id": "41",
                "name": "Seventh-day Adventist"
            },
            {
                "id": "42",
                "name": "Reformed Baptist"
            },
            {
                "id": "43",
                "name": "Reformed Presbyterian"
            },
            {
                "id": "44",
                "name": "Knanaya"
            },
            {
                "id": "45",
                "name": "Knanaya Catholic"
            },
            {
                "id": "46",
                "name": "Knanaya Jacobite"
            },
            {
                "id": "47",
                "name": "St. Thomas Evangelical"
            },
            {
                "id": "48",
                "name": "Syrian Jacobite"
            },
            {
                "id": "49",
                "name": "Syrian Orthodox"
            },
            {
                "id": "50",
                "name": "Others"
            }
        ]
    },
    // sikh
    {
        "id": "7",
        "name": "Sikh",
        "castealias": "Caste",
        "castes": [
            {
                "id": "1",
                "name": "Sikh - Ahluwalia"
            },
            {
                "id": "2",
                "name": "Sikh - Arora"
            },
            {
                "id": "3",
                "name": "Sikh - Bhatia"
            },
            {
                "id": "4",
                "name": "Sikh - Ghumar"
            },
            {
                "id": "5",
                "name": "Sikh - Intercaste"
            },
            {
                "id": "6",
                "name": "Sikh - Jat"
            },
            {
                "id": "7",
                "name": "Sikh - Kamboj"
            },
            {
                "id": "8",
                "name": "Sikh - Khatri"
            },
            {
                "id": "9",
                "name": "Sikh - Kshatriya"
            },
            {
                "id": "10",
                "name": "Sikh - Lubana"
            },
            {
                "id": "11",
                "name": "Sikh - Majabi"
            },
            {
                "id": "12",
                "name": "Sikh - Nai"
            },
            {
                "id": "13",
                "name": "Sikh - No Bar"
            },
            {
                "id": "14",
                "name": "Sikh - Rajput"
            },
            {
                "id": "15",
                "name": "Sikh - Ramdasia"
            },
            {
                "id": "16",
                "name": "Sikh - Ramgharia"
            },
            {
                "id": "17",
                "name": "Sikh - Saini"
            },
            {
                "id": "18",
                "name": "Sikh - Ravidasia"
            },
            {
                "id": "19",
                "name": "Sikh - Bhatra"
            },
            {
                "id": "20",
                "name": "Sikh - Tonk Kshatriya"
            },
            {
                "id": "21",
                "name": "Sikh - Unspecified"
            },
            {
                "id": "22",
                "name": "Others"
            }
        ]
    },
    // Jain all
    {
        "id": "8",
        "name": "Jain - All",
        "castealias": "Caste",
        "castes": [
            {
                "id": "1",
                "name": "Jain - Agarwal"
            },
            {
                "id": "2",
                "name": "Jain - Bania"
            },
            {
                "id": "3",
                "name": "Jain - Intercaste"
            },
            {
                "id": "4",
                "name": "Jain - Jaiswal"
            },
            {
                "id": "5",
                "name": "Jain - Khandelwal"
            },
            {
                "id": "6",
                "name": "Jain - Kutchi"
            },
            {
                "id": "7",
                "name": "Jain - No Bar"
            },
            {
                "id": "8",
                "name": "Jain - Oswal"
            },
            {
                "id": "9",
                "name": "Jain - Porwal"
            },
            {
                "id": "10",
                "name": "Jain - Unspecified"
            },
            {
                "id": "11",
                "name": "Jain - Vaishya"
            },
            {
                "id": "12",
                "name": "Jain - KVO"
            },
            {
                "id": "13",
                "name": "Others"
            }
        ]
    },
    // Jain digambar
    {
        "id": "9",
        "name": "Jain - Digambar",
        "castealias": "Caste",
        "castes": [
            {
                "id": "1",
                "name": "Digambar-Bisapanthi"
            },
            {
                "id": "2",
                "name": "Digambar-Gumanapanthi"
            },
            {
                "id": "3",
                "name": "Digambar-Taranapanthi"
            },
            {
                "id": "4",
                "name": "Digambar-Terapanthi"
            },
            {
                "id": "5",
                "name": "Digambar-Totapanthi"
            },
            {
                "id": "6",
                "name": "Jain - Agarwal"
            },
            {
                "id": "7",
                "name": "Jain - Bania"
            },
            {
                "id": "8",
                "name": "Jain - Intercaste"
            },
            {
                "id": "9",
                "name": "Jain - Jaiswal"
            },
            {
                "id": "10",
                "name": "Jain - Khandelwal"
            },
            {
                "id": "11",
                "name": "Jain - Kutchi"
            },
            {
                "id": "12",
                "name": "Jain - No Bar"
            },
            {
                "id": "13",
                "name": "Jain - Oswal"
            },
            {
                "id": "14",
                "name": "Jain - Porwal"
            },
            {
                "id": "15",
                "name": "Jain - Unspecified"
            },
            {
                "id": "16",
                "name": "Jain - Vaishya"
            },
            {
                "id": "17",
                "name": "Jain - KVO"
            },
            {
                "id": "18",
                "name": "Others"
            }
        ]
    },
    // Jain shwetambers
    {
        "id": "10",
        "name": "Jain - Shwetambar",
        "castealias": "Caste",
        "castes": [
            {
                "id": "1",
                "name": "Shvetambar-Murtipujaka"
            },
            {
                "id": "2",
                "name": "Shvetambar-Sthanakvasi"
            },
            {
                "id": "3",
                "name": "Shvetambar-Terapanthi"
            },
            {
                "id": "4",
                "name": "Jain - Agarwal"
            },
            {
                "id": "5",
                "name": "Jain - Bania"
            },
            {
                "id": "6",
                "name": "Jain - Intercaste"
            },
            {
                "id": "7",
                "name": "Jain - Jaiswal"
            },
            {
                "id": "8",
                "name": "Jain - Khandelwal"
            },
            {
                "id": "9",
                "name": "Jain - Kutchi"
            },
            {
                "id": "10",
                "name": "Jain - No Bar"
            },
            {
                "id": "11",
                "name": "Jain - Oswal"
            },
            {
                "id": "12",
                "name": "Jain - Porwal"
            },
            {
                "id": "13",
                "name": "Jain - Unspecified"
            },
            {
                "id": "14",
                "name": "Jain - Vaishya"
            },
            {
                "id": "15",
                "name": "Jain - KVO"
            },
            {
                "id": "16",
                "name": "Others"
            }
        ]
    },
    // Parsi
    {
        "id": "12",
        "name": "Parsi",
        "castealias": "Caste",
        "castes": [
            {
                "id": "1",
                "name": "Irani"
            },
            {
                "id": "2",
                "name": "Parsi"
            },
            {
                "id": "3",
                "name": "Intercaste"
            },
            {
                "id": "4",
                "name": "Others"
            }
        ]
    },
    // Buddhist
    {
        "id": "13",
        "name": "Buddhist",
        "castealias": "Branch",
        "castes": [
          
            {
                "id": "1",
                "name": "Mahayana"
            },
            {
                "id": "2",
                "name": "Nichiren Buddhism"
            },
            {
                "id": "3",
                "name": "Pure Land Buddhism"
            },
            {
                "id": "4",
                "name": "Tantrayana (Vajrayana Tibetan)"
            },
            {
                "id": "5",
                "name": "Theravada (Hinayana)"
            },
            {
                "id": "6",
                "name": "Tendai Buddhism (Japanese)"
            },
            {
                "id": "7",
                "name": "Zen Buddhism (China)"
            },
            {
                "id": "8",
                "name": "Others"
            }
        ]
    },
    // Jewish
    {
        "id": "14",
        "name": "Jewish",
        "castealias": "Caste",
        "castes": [
            {
                "id": "0",
                "name": "Others"
            }
        ]
    },
    // Inter religion
    {
        "id": "15",
        "name": "Inter-Religion",
        "castealias": "Caste",
        "castes": [
            {
                "id": "0",
                "name": "Others"
            }
        ]
    },
    // No religion
    {
        "id": "16",
        "name": "No Religious Belief",
        "castealias": "Caste",
        "castes": [
            {
                "id": "0",
                "name": "Others"
            }
        ]
    }

];

// API route to serve religion data
router.get("/religion", (req, res) => {
    res.json(religionData);
});


// Initialize multer with the storage configuration
module.exports = router;
