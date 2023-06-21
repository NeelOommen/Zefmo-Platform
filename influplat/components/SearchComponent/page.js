import { useEffect, useState } from "react";
import ArrayElements from "../ArrayElements/page";


export default function SearchComponent({ offset, setOffset, setList, influencerList, setValid, validFlag, platform, setPlatform, loginStatus, showModal, setShowModal, preset, setPreset, presetToLoad, setPresetToLoad, presetFlag, setPresetFlag, colFlag, setColFlag }) {
    const [collapsed, setCollapsed] = useState(false);
    const [buttonText, setButtonText] = useState('Show Filters');
    const [nicheSet, setNicheSet] = useState([]);
    const [topicSet, setTopicSet] = useState([]);

    //instagram filters
    const [instagramId, setInstagramId] = useState('');
    const [location, setLocation] = useState('');
    const [minFollowers, setMinFollowers] = useState(0);
    const [maxFollowers, setMaxFollowers] = useState(0);
    const [category, setCategory] = useState('');
    const [avgLikes, setAvgLikes] = useState(0);
    const [avgComments, setAvgComments] = useState(0);
    const [tags, setTags] = useState([]);
    const [nTag, setNTag] = useState('');

    //youtube filters
    const [maxSubscribers, setMaxYoutubeSubscribers] = useState(0);
    const [minSubscribers, setMinYoutubeSubscribers] = useState(0);
    const [avgYoutubeComments, setAvgYoutubeComments] = useState(0);
    const [avgYoutubeLikes, setAvgYoutubeLikes] = useState(0);
    const [avgYoutubeMaxViews, setAvgMaxYoutubeViews] = useState(0);
    const [avgYoutubeMinViews, setAvgMinYoutubeViews] = useState(0);
    const [topic, setTopic] = useState('');
    const [niche, setNiche] = useState('');
    const [audienceCountry, setAudienceCountry] = useState('');
    const [audienceMaxAge, setAudienceMaxAge] = useState(0);
    const [audienceMinAge, setAudienceMinAge] = useState(0);
    const [audienceMaleRatio, setAudienceMaleRatio] = useState(0);
    const [audienceFemaleRatio, setAudienceFemaleRatio] = useState(0);
    const [topicList, setTopicList] = useState([]);
    const [nicheList, setNicheList] = useState([]);

    function getCategories(){
        fetch('https://dev.creatordb.app/v2/topicTable', {
          headers: {
            'Accept': 'application/json',
            'apiId': 'LE6DPZQkR3TQShxofXoD2j8qCBu1-f0jti665m1t50dwDD12W'
          }
        })
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            const nicheKeys = Object.keys(data.data.niches)
            const topicKeys = Object.keys(data.data.topics)
            
            var niches = ['']
            for(let i = 0; i<nicheKeys.length; i+=1){
                var newElement = {
                    'name': data.data.niches[nicheKeys[i]].name,
                    'category': data.data.niches[nicheKeys[i]].category,
                    'channelCnt': data.data.niches[nicheKeys[i]].channelCount,
                    'tag': nicheKeys[i],
                    'key': i
                }

                niches.push(newElement)
            }

            niches.sort(function(a,b){
                return a['name'] > b['name'] ? 1 : ((a['name'] <  b['name']) ? -1 : 0)
            })

            setNicheSet(niches)

            var topics = ['']
            for(let i = 0; i<topicKeys.length; i+=1){
                var newElement = {
                    'name': data.data.topics[topicKeys[i]].name,
                    'category': data.data.topics[topicKeys[i]].category,
                    'channelCnt': data.data.topics[topicKeys[i]].channelCount,
                    'tag': topicKeys[i],
                    'key': (5000 + i)
                }

                topics.push(newElement)
            }

            setTopicSet(topics)
        })
        .catch(error => {
            console.log(error)
        })
    }

    function loadPreset(){
        setInstagramId(presetToLoad.instagramId.stringValue)
        setLocation(presetToLoad.location.stringValue)
        setMinFollowers(presetToLoad.minFollowers.integerValue)
        setMaxFollowers(presetToLoad.maxFollowers.integerValue)
        setCategory(presetToLoad.category.stringValue)
        setAvgLikes(presetToLoad.avgLikes.integerValue)
        setAvgComments(presetToLoad.avgComments.integerValue)
        setTags(presetToLoad.tags.arrayValue)
        setMaxYoutubeSubscribers(presetToLoad.maxSubscribers.integerValue)
        setMinYoutubeSubscribers(presetToLoad.minSubscribers.integerValue)
        setAvgYoutubeComments(presetToLoad.avgYoutubeComments.integerValue)
        setAvgYoutubeLikes(presetToLoad.avgYoutubeLikes.integerValue)
        setAvgMaxYoutubeViews(presetToLoad.avgYoutubeMaxViews.integerValue)
        setAvgMinYoutubeViews(presetToLoad.avgYoutubeMinViews.integerValue)
        setAudienceCountry(presetToLoad.audienceCountry.stringValue)
        setAudienceMaxAge(presetToLoad.audienceMaxAge.integerValue)
        setAudienceMinAge(presetToLoad.audienceMinAge.integerValue)
        setAudienceMaleRatio(presetToLoad.audienceMaleRatio.integerValue)
        setAudienceFemaleRatio(presetToLoad.audienceFemaleRatio.integerValue)
        setTopicList(presetToLoad.topicList.arrayValue)
        setNicheList(presetToLoad.nicheList.arrayValue)
    }

    useEffect(() => {
        getCategories();
        function resizeManagement(){
            if(window.innerWidth>768){
                setCollapsed(false)
            }
        }

        window.addEventListener('resize', resizeManagement)
    },[])

    // useEffect(() => {
    //     searchHandler()
    // }, [offset])

    useEffect(() => {
        if(presetFlag === true){
            loadPreset()
            setPresetFlag(false)
        }
    },[presetFlag])

    function createInstagramFilters(){
        var filterList = []

        //Minimum Follower filter
        if(minFollowers != 0){
            const filter = {
                'filterKey': 'followers',
                'op': '>',
                'value': parseInt(minFollowers)
            }

            filterList.push(filter)
        }

        //Maximum Follower Filter
        if(maxFollowers != 0){
            const filter = {
                'filterKey': 'followers',
                'op': '<',
                'value': parseInt(maxFollowers)
            }

            filterList.push(filter)
        }

        //Location Filter
        if(location != ''){
            const filter = {
                'filterKey': 'country',
                'op': '=',
                'value': location
            }

            filterList.push(filter)
        }

        //Category Filter
        if(category != ''){
            const filter = {
                'filterKey': 'category',
                'op': '=',
                'value': category
            }

            filterList.push(filter)
        }

        //Instagram ID filter
        if(instagramId != ''){
            const filter = {
                'filterKey': 'instagramId',
                'op': '=',
                'value': instagramId
            }

            filterList.push(filter)
        }

        //Average Like Filter
        if(avgLikes > 0){
            const filter = {
                'filterKey': 'avgLikes',
                'op': '>',
                'value': parseInt(avgLikes)
            }

            filterList.push(filter)
        }

        //Average Comment Filter
        if(avgComments > 0){
            const filter = {
                'filterKey': 'avgComments',
                'op': '>',
                'value': parseInt(avgComments)
            }

            filterList.push(filter)
        }

        //Hashtag Filter
        if(tags.length > 0){
            const filter = {
                'filterKey': 'hashtags',
                'op': '=',
                'value': tags
            }

            filterList.push(filter)
        }

        return filterList;
    }

    function createYoutubeFilters(){
        var filterList = []

        //Maximum Subscriber filter
        if(maxSubscribers != 0){
            const filter = {
                'filterKey': 'subscribers',
                'op': '<',
                'value': parseInt(maxSubscribers)
            }

            filterList.push(filter)
        }

        //Minimum Subscriber filter
        if(minSubscribers != 0){
            const filter = {
                'filterKey': 'subscribers',
                'op': '>',
                'value': parseInt(minSubscribers)
            }

            filterList.push(filter)
        }

        //average Comments filter
        if(avgYoutubeComments != 0){
            const filter = {
                'filterKey': 'avgComments1Y',
                'op': '>',
                'value': parseInt(avgYoutubeComments)
            }

            filterList.push(filter)
        }

        //Average Likes filter
        if(avgYoutubeLikes != 0){
            const filter = {
                'filterKey': 'avgLikes1Y',
                'op': '>',
                'value': parseInt(avgYoutubeLikes)
            }

            filterList.push(filter)
        }

        //Average max views filter
        if(avgYoutubeMaxViews != 0){
            const filter = {
                'filterKey': 'avgViews1Y',
                'op': '>',
                'value': parseInt(avgYoutubeMaxViews)
            }

            filterList.push(filter)
        }

        //Average max views filter
        if(avgYoutubeMinViews != 0){
            const filter = {
                'filterKey': 'avgViews1Y',
                'op': '<',
                'value': parseInt(avgYoutubeMinViews)
            }

            filterList.push(filter)
        }

        //Audience country filter
        if(audienceCountry != ''){
            const filter = {
                'filterKey': 'demographic.mainCountry',
                'op': '=',
                'value': audienceCountry
            }

            filterList.push(filter)
        }

        //Average audience max age filter
        if(audienceMaxAge != 0){
            const filter = {
                'filterKey': 'demographic.avgAge',
                'op': '>',
                'value': parseInt(audienceMaxAge)
            }

            filterList.push(filter)
        }

        //Average audience min age filter
        if(audienceMinAge != 0){
            const filter = {
                'filterKey': 'demographic.avgAge',
                'op': '<',
                'value': parseInt(audienceMinAge)
            }

            filterList.push(filter)
        }

        //Audience male ratio filter
        if(audienceMaleRatio != 0){
            const filter = {
                'filterKey': 'demographic.genderMaleRatio',
                'op': '>',
                'value': parseFloat(audienceMaleRatio)
            }

            filterList.push(filter)
        }

        //Audience male ratio filter
        if(audienceFemaleRatio != 0){
            const filter = {
                'filterKey': 'demographic.genderFemaleRatio',
                'op': '>',
                'value': parseFloat(audienceFemaleRatio)
            }

            filterList.push(filter)
        }

        //topic filter
        console.log(topicList)

         if(topicList.length != 0){
            const filter = {
                'filterKey': 'topicIds',
                'op': '=',
                'value': topicList
            }

            filterList.push(filter)
        }

        //niche filter
        if(nicheList.length != 0){
            const filter = {
                'filterKey': 'nicheIds',
                'op': '=',
                'value': nicheList
            }

            filterList.push(filter)
        }

        return filterList;
    }

    function instagramSearch(){
        const filterList = createInstagramFilters()

        fetch('https://dev.creatordb.app/v2/instagramAdvancedSearch', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'apiId': process.env.NEXT_PUBLIC_CREATOR_DB_KEY
            },
            body: JSON.stringify({
              'desc': true,
              'filters': filterList,
              'maxResults': 10,
              'offset': offset,
              'sortBy': 'followers'
            })
        }).then(response => response.json())
        .then(data => {
            setList(data)
            setValid(true)
        })
        .catch(error => {
            console.log(error)
            setValid(false)
        })
    }

    function youtubeSearch(){
        const youtubeSearchUrl = 'https://dev.creatordb.app/v2/youtubeAdvancedSearch'
        const filterList = createYoutubeFilters()

        fetch(youtubeSearchUrl, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'apiId': process.env.NEXT_PUBLIC_CREATOR_DB_KEY
            },
            body: JSON.stringify({
              'desc': true,
              'filters': filterList,
              'maxResults': 10,
              'offset': offset,
              'sortBy': 'subscribers'
            })
        }).then(response => response.json())
        .then(data => {
            setList(data)
            console.log(data)
            setValid(true)
        })
        .catch(error => {
            console.log(error)
            setValid(false)
        })
    }

    var searchHandler = function() {
        if(window.innerWidth < 768){
            setCollapsed(true)
        }
        if(platform === 'Instagram'){
            instagramSearch()
        }
        else if(platform === 'Youtube'){
            youtubeSearch()
        }
    }

    var collapseHandler = function() {
        if(collapsed === true){
            setButtonText('Hide Filters');
        }
        else{
            setButtonText('Show Filters');
        }

        setCollapsed(!collapsed);
        setColFlag(collapsed)
    }

    function platformChange(e){
        setPlatform(e)
        setValid(false)
    }

    function addTag(){
        var newTag = nTag
        setNTag('')

        newTag = '#' + newTag


        if(newTag !== '#'){
            setTags([
                ...tags,
                newTag
            ])
        }
    }

    function addTopic(){
        var newTopic = topic
        setTopic('')

        if(newTopic != ''){
            setTopicList([
                ...topicList,
                newTopic
            ])
        }
    }

    function addNiche(){
        var newNiche = niche
        setNiche('')

        if(newNiche != ''){
            setNicheList([
                ...nicheList,
                newNiche
            ])
        }
    }

    function clearTag(){
        setTags([])
    }

    function clearTopic(){
        setTopicList([])
    }

    function clearNiche(){
        setNicheList([])
    }

    function createPreset(){
        if(loginStatus === true){
            setShowModal(true)

            const tempPreset = {
                'instagramId': instagramId,
                'location': location,
                'minFollowers': parseInt(minFollowers),
                'maxFollowers': parseInt(maxFollowers),
                'category': category,
                'avgLikes': parseInt(avgLikes),
                'avgComments': parseInt(avgComments),
                'tags': tags,
                'maxSubscribers': parseInt(maxSubscribers),
                'minSubscribers': parseInt(minSubscribers),
                'avgYoutubeComments': parseInt(avgYoutubeComments),
                'avgYoutubeLikes': parseInt(avgYoutubeLikes),
                'avgYoutubeMaxViews': parseInt(avgYoutubeMaxViews),
                'avgYoutubeMinViews': parseInt(avgYoutubeMinViews),
                'audienceCountry': audienceCountry,
                'audienceMaxAge': parseInt(audienceMaxAge),
                'audienceMinAge': parseInt(audienceMinAge),
                'audienceMaleRatio': parseFloat(audienceMaleRatio),
                'audienceFemaleRatio': parseFloat(audienceFemaleRatio),
                'topicList': topicList,
                'nicheList': nicheList
            }
            setPreset(tempPreset)
        }
        else{
            alert('You must be logged in to save presets.')
        }
    }

    const countryOptions = ['','Afghanistan','Albania','Algeria','American Samoa','Andorra','Angola','Anguilla','Antarctica','Antigua & Barbuda','Argentina','Armenia','Aruba','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bermuda','Bhutan','Bolivia','Bosnia & Herzegovina','Bosnia and Herzegovina','Botswana','Brazil','British Indian Ocean Territory','British Virgin Islands','Brunei','Bulgaria','Burkina Faso','Burundi','Cabo Verde','Cambodia','Cameroon','Canada','Cape Verde','Cayman Islands','Chad','Chile','China','Christmas Island','Colombia','Congo - Brazzaville','Congo - Kinshasa','Costa Rica','Croatia','Cuba','Curaçao','Cyprus','Czech Republic','Czechia','Côte d’Ivoire','Denmark','Djibouti','Dominica','Dominican Republic','Ecuador','Egypt','El Salvador','Eritrea','Estonia','Eswatini','Ethiopia','Falkland Islands (Islas Malvinas)','Faroe Islands','Fiji','Finland','France','French Guiana','French Polynesia','Gabon','Gambia','Georgia','Germany','Ghana','Gibraltar','Greece','Greenland','Grenada','Guadeloupe','Guam','Guatemala','Guernsey','Guinea','Guinea-Bissau','Guyana','Haiti','Heard & McDonald Islands','Honduras','Hong Kong','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Isle of Man','Israel','Italy','Ivory Coast','Jamaica','Japan','Jersey','Jordan','Kazakhstan','Kenya','Kosovo','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Macao','Macedonia','Madagascar','Malaysia','Maldives','Mali','Malta','Martinique','Mauritania','Mauritius','Mayotte','Mexico','Moldova','Monaco','Mongolia','Montenegro','Morocco','Mozambique','Myanmar (Burma)','Myanmar','Namibia','Nepal','Netherlands','New Caledonia','New Zealand','Nicaragua','Nigeria','Niue','North Korea','North Macedonia','Norway','Oman','Pakistan','Palau','Palestine','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Poland','Portugal','Puerto Rico','Qatar','Romania','Russia','Rwanda','Réunion','Samoa','San Marino','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Sint Maarten','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Georgia & South Sandwich Islands','South Korea','South Sudan','Spain','Sri Lanka','St. Barthélemy','St. Kitts & Nevis','St. Lucia','St. Martin','St. Vincent & Grenadines','Sudan','Suriname','Sweden','Switzerland','Syria','Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad & Tobago','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Turks and Caicos Islands','Türkiye','U.S. Outlying Islands','U.S. Virgin Islands','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan','Vanuatu','Vatican City','Venezuela','Vietnam','Western Sahara','Yemen','Zambia','Zimbabwe','Åland Islands']

    const categoryOptions = ['','ABORTION_SERVICES','ACCESSORIES_STORE','ACCOUNTANT','ACTIVITY_GENERAL','ACTIVITY_SPORT','ACTOR','ACUPUNCTURE','ADDICTION_RESOURCES','ADDICTION_SERVICE','ADDICTION_TREATMENT_CENTER','ADOPTION_SERVICE','ADULT_ENTERTAINMENT','ADULT_ENTERTAINMENT_CLUB','ADVERTISING_AGENCY','ADVERTISING_MARKETING','AEROSPACE_COMPANY','AFRICAN_METHODIST_EPISCOPAL_CHURCH','AFRICAN_RESTAURANT','AGRICULTURAL_COOPERATIVES','AGRICULTURAL_SERVICE','AGRICULTURE','AIDS_RESOURCES','AIRCRAFT_DEALERSHIP','AIRLINE','AIRLINE_INDUSTRY_SERVICES','AIRPORT_LOUNGE','AIRPORT_SHUTTLE','AIRPORT_TERMINAL','ALBUM','ALCOHOL_ADDICTION_TREATMENT_CENTER','ALLERGIST','ALTERNATIVE_HOLISTIC_HEALTH','AMATEUR_SPORTS_LEAGUE','AMATEUR_TEAM','AMBULANCE_RESCUE','AMERICAN_RESTAURANT','AMPHITHEATER','AMUSEMENT_PARK_RIDE','ANESTHESIOLOGISTS','ANGLICAN_CHURCH','ANIMAL','ANIMALS_PETS','ANIMAL_RESCUE_SERVICE','ANIMAL_SHELTER','ANIMATION_STUDIO','ANIMATOR','ANTIQUE_STORE','APARTMENT_CONDO_BUILDING','APOSTOLIC_CHURCH','APP','APPAREL','APPLIANCE_MANUFACTURER','APPLIANCE_REPAIR_SERVICE','APPLIANCE_STORE','AQUARIUM','AQUATIC_PET_STORE','ARABIAN_RESTAURANT','ARBORETUM','ARCADE','ARCHAEOLOGICAL_SERVICES','ARCHERY','ARCHERY_SHOP','ARCHITECTURAL_DESIGNER','ARMED_FORCES','AROMATHERAPY','ART','ARTIST','ARTS_CRAFTS_SUPPLY_STORE','ARTS_SITE','ART_GALLERY','ART_MUSEUM','ART_RESTORATION','ART_SCHOOL','ASIAN_FUSION_RESTAURANT','ASIAN_RESTAURANT','ASSEMBLY_OF_GOD','ASTROLOGIST','ATHLETE','ATV_DEALER','ATV_RECREATION_PARK','ATV_RENTAL_SHOP','AUCTION_HOUSE','AUDIOLOGIST','AUDIOVISUAL_EQUIPMENT','AUDITORIUM','AUSTRALIAN_RESTAURANT','AUTHOR','AUTOMATED_TELLER_MACHINE_ATM','AUTOMATION_SERVICES','AUTOMOBILE_LEASING','AUTOMOTIVE_CONSULTANT','AUTOMOTIVE_CUSTOMIZING','AUTOMOTIVE_DEALERSHIP','AUTOMOTIVE_MANUFACTURING','AUTOMOTIVE_PARTS_ACCESSORIES','AUTOMOTIVE_REPAIR','AUTOMOTIVE_RESTORATION','AUTOMOTIVE_SERVICES','AUTOMOTIVE_SHIPPING_SERVICE','AUTOMOTIVE_STORAGE','AUTOMOTIVE_STORE','AUTOMOTIVE_WHEEL_POLISHING_SERVICE','AUTOMOTIVE_WHOLESALER','AUTO_BODY_SHOP','AUTO_COMPANY','AUTO_DETAILING_SERVICE','AUTO_GLASS','AVIATION_REPAIR_STATION','AVIATION_SCHOOL','BABYSITTER','BABY_KIDS','BAGEL_SHOP','BAGS_LUGGAGE','BAGS_LUGGAGE_COMPANY','BAGS_LUGGAGE_STORE','BAKERY','BALLROOM','BAND','BANDS_MUSICIANS','BANK','BANKRUPTCY_LAWYER','BAPTIST_CHURCH','BARBECUE_RESTAURANT','BARBER','BARBER_SHOP','BARTENDING_SCHOOL','BARTENDING_SERVICE','BAR_GRILL','BASEBALL_FIELD','BASEBALL_STADIUM','BASKETBALL_COURT','BASS_GUITARIST','BATTING_CAGE','BAVARIAN_RESTAURANT','BEACH','BEACH_RESORT','BEATBOXER','BEAUTY_SALON','BEAUTY_STORE','BED_AND_BREAKFAST','BEER_BAR','BEER_GARDEN','BEIJING_RESTAURANT','BENGALI_BANGLADESHI_RESTAURANT','BETTING_SHOP','BICYCLE_REPAIR_SERVICE','BIG_BOX_RETAILER','BIKE_RENTAL_BIKE_SHARE','BIKE_SHOP','BIKE_TRAIL','BINGO_HALL','BIOTECHNOLOGY','BIZ_SITE','BLACKSMITH','BLINDS_CURTAINS','BLOGGER','BLOOD_BANK','BOARD_GAME','BOAT_DEALER','BOAT_RENTAL','BOAT_SAILING_INSTRUCTOR','BOAT_SERVICE','BOAT_TOUR_AGENCY','BOOK','BOOKS_LITERATURE','BOOKS_MAGAZINES','BOOK_MAGAZINE_DISTRIBUTION','BOOK_SERIES','BOTANICAL_GARDEN','BOTTLED_WATER_COMPANY','BOTTLED_WATER_SUPPLIER','BOUTIQUE_STORE','BOWLING_ALLEY','BOXING_STUDIO','BRAND','BRAND_AGENCY','BRAZILIAN_RESTAURANT','BREAKFAST_BRUNCH_RESTAURANT','BREWERY','BRIDAL_SHOP','BRIDGE','BROADCASTING_MEDIA_PRODUCTION','BROKERAGE','BROKERS_FRANCHISING','BUBBLE_TEA_SHOP','BUDDHIST_TEMPLE','BUILDING_MATERIAL_STORE','BUILDING_MATS','BURGER_RESTAURANT','BUSINESS','BUSINESS_CENTER','BUSINESS_CONSULTANT','BUSINESS_SUPPLY_SERVICE','BUS_LINE','BUS_STATION','BUS_TOUR_AGENCY','BUTCHER','CABIN','CABINETS_COUNTERTOPS','CABLE_SATELLITE_SERVICE','CAFE','CAFETERIA','CAJUN_CREOLE_RESTAURANT','CAMBODIAN_RESTAURANT','CAMERA_OPERATOR','CAMERA_PHOTO','CAMERA_STORE','CAMPGROUND','CAMPUS_BUILDING','CANAL','CANDY_STORE','CANNABIS_CLINIC','CANOE_KAYAK_RENTAL_SHOP','CANTONESE_RESTAURANT','CAPITOL_BUILDING','CAR','CARDIOLOGISTS','CAREER_COUNSELOR','CARGO_FREIGHT','CARIBBEAN_RESTAURANT','CARPENTER','CARPET_CLEANER','CARPET_FLOORING_STORE','CAR_DEALERSHIP','CAR_DEALER_CAN_RECEIVE_LEADS','CAR_RENTAL','CAR_STEREO_STORE','CAR_WASH_DETAILING','CASINO','CASTING_DIRECTOR','CASTLE','CATERER','CATHOLIC_CHURCH','CAUSE','CAVE','CEMETERY','CHARISMATIC_CHURCH','CHARITY_ORGANIZATION','CHEESE_SHOP','CHEF','CHEMICALS_GASSES','CHICKEN_RESTAURANT','CHILDRENS_CLOTHING_STORE','CHILDREN_PARENTING','CHILD_CARE','CHILD_DEVELOPMENT','CHIMNEY_SWEEPER','CHINESE_RESTAURANT','CHIROPRACTOR','CHOCOLATE_SHOP','CHOIR','CHOREOGRAPHER','CHRISTIAN_CHURCH','CHURCH','CHURCH_OF_CHRIST','CHURCH_OF_GOD','CHURCH_OF_JESUS_CHRIST_OF_LATTERDAY_SAINTS','CINEMATOGRAPHER','CIRCUS','CITY','CITY_HALL','CITY_INFRASTRUCTURE','CIVILIZATION_MUSEUM','CLEANING_SERVICE','CLOTHING','CLOTHING_COMPANY','CLOTHING_STORE','CLOTHING_SUPPLY_DISTRIBUTION','CLUBHOUSE','COACH','COCKTAIL_BAR','COFFEE_SHOP','COLLECTIBLES_STORE','COLLEGE_UNIVERSITY_BOOKSTORE','COLOMBIAN_RESTAURANT','COMEDIAN','COMEDY_CLUB','COMFORT_FOOD_RESTAURANT','COMIC_BOOK_STORE','COMMERCIAL_BANK','COMMERCIAL_EQUIPMENT','COMMERCIAL_INDUSTRIAL','COMMERCIAL_INDUSTRIAL_EQUIPMENT','COMMERCIAL_REAL_ESTATE','COMMERCIAL_TRUCK_DEALER','COMMERCIAL_VEHICLE_DEALERSHIP','COMMUNITY','COMMUNITY_CENTER','COMMUNITY_COLLEGE','COMMUNITY_GARDEN','COMMUNITY_MUSEUM','COMMUNITY_ORGANIZATION','COMMUNITY_SERVICES','COMPANY','COMPETITION','COMPUTER','COMPUTER_COMPANY','COMPUTER_SERVICES','COMPUTER_SITE','COMPUTER_STORE','COMPUTER_TRAINING','CONCERT_TOUR','CONCERT_TOUR_MANAGER','CONCRETE_CONTRACTOR','CONGREGATIONAL_CHURCH','CONSTRUCTION_COMPANY','CONSULATE_EMBASSY','CONSULTING_COMPANY','CONTEMPORARY_ART_MUSEUM','CONTINENTAL_RESTAURANT','CONTRACTOR','CONTRACT_LAWYER','CONVENIENCE_STORE','CONVENTION_CENTER','CONVENT_MONASTERY','COOKING_LESSON','COPYWRITING_SERVICE','CORPORATE_LAWYER','CORPORATE_OFFICE','COSMETICS_BEAUTY_SUPPLY','COSMETIC_DENTIST','COSMETOLOGY_SCHOOL','COSTUME_DESIGNER','COSTUME_SHOP','COTTAGE','COUNSELING_MENTAL_HEALTH','COUNSELOR','COUNTRY','COUNTY','COURTHOUSE','CRAFTS','CREATIVE_DIRECTOR','CREDIT_COUNSELING','CREDIT_UNION','CRICKET_GROUND','CRIMINAL_LAWYER','CRISIS_PREVENTION_CENTER','CRPERIE','CRUISE','CRUISE_AGENCY','CUBAN_RESTAURANT','CULTURAL_CENTER','CULTURAL_GIFTS_STORE','CUPCAKE_SHOP','CURRENCY_EXCHANGE','CYCLING_STUDIO','DAIRY_FARM','DAMAGE_RESTORATION_SERVICE','DANCER','DANCE_INSTRUCTION','DANCE_SCHOOL','DATING_SERVICE','DAY_CARE_PRESCHOOL','DAY_SPA','DECK_PATIO','DEFENSE_COMPANY','DELI','DENTIST','DEPARTMENT_STORE','DERMATOLOGIST','DESIGN','DESIGNER','DESSERT_RESTAURANT','DIAGNOSTIC_CENTER','DIALYSIS_CLINIC','DIGITAL_CREATOR','DIM_SUM_RESTAURANT','DINER','DISABILITY_SERVICES','DISCOUNT_STORE','DISC_GOLF_COURSE','DISTILLERY','DIVE_BAR','DIVE_SPOT','DIVORCE_FAMILY_LAWYER','DJ','DMV','DOG_BREEDER','DOG_DAY_CARE_CENTER','DOG_PARK','DOG_TRAINING','DOG_WALKER','DONUTS_SHOP','DORM','DRINK','DRIVEIN_MOVIE_THEATER','DRIVING_RANGE','DRIVING_SCHOOL','DRUGS','DRUG_ADDICTION_TREATMENT_CENTER','DUI_LAWYER','DUTYFREE_SHOP','DVD_VIDEO_STORE','EASTERN_ORTHODOX_CHURCH','ECIGARETTE_STORE','ECOMMERCE_WEBSITE','ECO_TOURS','EDITOR','EDITORIAL_OPINION','EDUCATIONAL_CAMP','EDUCATIONAL_CONSULTANT','EDUCATIONAL_RESEARCH','EDUCATIONAL_SUPPLIES','EDUCATION_COMPANY','EDUCATION_COMPANY_KEY','EDUCATION_LEARNING','EDU_SITE','ELECTRICIAN','ELECTRIC_UTILITY_PROVIDER','ELECTRIC_VEHICLE_DEALERSHIP','ELECTRONICS','ELECTRONICS_COMPANY','ELECTRONICS_STORE','ELEMENTARY_SCHOOL','ELEVATOR_SERVICES','EMERGENCY_ROADSIDE_SERVICE','EMPLOYMENT_AGENCY','ENDOCRINOLOGISTS','ENDODONTIST','ENERGY_COMPANY','ENGINEERING_SERVICE','ENTERTAINMENT_SITE','ENTREPRENEUR','ENVIRONMENTAL','ENVIRONMENTAL_CONSERVATION','ENVIRONMENTAL_CONSULTANT','EPISCOPAL_CHURCH','EPISODE','EQUESTRIAN_FACILITY','ESCAPE_GAME_ROOM','ESPORTS_LEAGUE','ESPORTS_TEAM','EUROPEAN_RESTAURANT','EVANGELICAL_CHURCH','EVENT_PHOTOGRAPHER','EVENT_SPACE','EXCAVATION_WRECKING','EXCHANGE_PROGRAM','EXECUTIVE_FILM_PRODUCER','EXOTIC_CAR_RENTAL','FABRIC_STORE','FAIRGROUND','FAMILY_DOCTOR','FAMILY_MEDICINE_PRACTICE','FAMILY_STYLE_RESTAURANT','FAMILY_THERAPIST','FAN_PAGE','FARM','FARMERS_MARKET','FARM_EQUIPMENT_SERVICE','FASHION_ACCESSORIES','FASHION_COMPANY','FASHION_DESIGNER','FASHION_MODEL','FASHION_STYLE','FASHION_STYLIST','FAST_FOOD_RESTAURANT','FENCE_GATE_CONTRACTOR','FENCING_CLUB','FERRY_BOAT_COMPANY','FERTILITY_DOCTOR','FESTIVAL','FICTIONAL_CHARACTER','FIELD','FILIPINO_RESTAURANT','FILM_DIRECTOR','FILM_EDITOR','FILM_MUSIC_SUPERVISOR','FILM_PRODUCER','FILM_PRODUCTION_MANAGER','FILM_SOUND_EDITOR','FILM_SOUND_RECORDIST','FINANCE','FINANCIAL_AID','FINANCIAL_CONSULTANT','FINANCIAL_PLANNING','FINANCIAL_SERVICES','FIREPLACES','FIREWORKS_RETAILER','FIRE_PROTECTION','FIRE_STATION','FIRST_AID_CLASS','FISHING_CHARTER','FISHING_SPOT','FISHING_STORE','FISH_CHIPS_SHOP','FISH_FARM','FISH_MARKET','FITNESS_BOOT_CAMP','FITNESS_MODEL','FITNESS_WORKOUTS','FJORD_LOCH','FLEA_MARKET','FLIGHT_SCHOOL','FLORIST','FOOD','FOOD_BEVERAGE','FOOD_BEVERAGE_SERVICE_DISTRIBUTION','FOOD_COMPANY','FOOD_CONSULTANT','FOOD_CRITIC','FOOD_DELIVERY_SERVICE','FOOD_DRINK','FOOD_STAND','FOOD_TOUR_AGENCY','FOOD_TRUCK','FOOD_WEBSITE','FOOD_WHOLESALER','FOOTBALL_STADIUM','FORESTRY_LOGGING','FORESTRY_SERVICE','FRANCHISING_SERVICE','FRENCH_RESTAURANT','FROZEN_YOGURT_SHOP','FRUIT_VEGETABLE_STORE','FULL_GOSPEL_CHURCH','FUNERAL_SERVICE','FURNITURE','FURNITURE_REPAIR','FURNITURE_STORE','GAME','GAMES_PUZZLES_PLAY','GAME_PUBLISHER','GAMING_VIDEO_CREATOR','GARAGE_DOOR_SERVICES','GARDENER','GARDEN_CENTER','GASTROENTEROLOGIST','GASTROPUB','GAS_CHEMICAL_SERVICE','GAS_STATION','GAY_BAR','GELATO_SHOP','GENEALOGIST','GENERAL_DENTIST','GEOGRAPHY_GENERAL','GERMAN_RESTAURANT','GIFT_SHOP','GLASS_BLOWER','GLASS_MANUFACTURER','GLASS_MIRROR_SHOP','GLASS_SERVICE','GLUTENFREE_RESTAURANT','GOLF_CART_DEALER','GOLF_COURSE','GOLF_INSTRUCTOR','GOVERNMENT_BUILDING','GOVERNMENT_OFFICIAL','GOVERNMENT_ORGANIZATION','GOV_SITE','GO_KARTING','GRAPHIC_DESIGN','GREEK_RESTAURANT','GROCERY_STORE','GUITARIST','GUN_RANGE','GUN_STORE','GYM','GYMNASTICS_CENTER','HAIRPIECES_EXTENSIONS','HAIR_BEAUTY_SUPPLY','HAIR_REMOVAL','HAIR_REPLACEMENT','HAIR_SALON','HAIR_STYLIST','HARBOR','HARDWARE_STORE','HAT_STORE','HAUNTED_HOUSES','HAWAIIAN_RESTAURANT','HEALTHCARE_ADMINISTRATOR','HEALTH_BEAUTY','HEALTH_COMPANY','HEALTH_FOOD_RESTAURANT','HEALTH_FOOD_STORE','HEALTH_MEDICAL_NEW','HEALTH_SITE','HEALTH_SPA','HEATING_VENTILATING_AIR_CONDITIONING','HEDGE_FUND','HIGHWAY','HIGH_SCHOOL','HIKING_TRAIL','HINDU_TEMPLE','HISTORICAL_TOUR_AGENCY','HISTORY_MUSEUM','HISTORY_PHILOSOPHY','HOBBY_STORE','HOCKEY_ARENA','HOLINESS_CHURCH','HOME','HOMEBREW_SUPPLY_STORE','HOME_BUSINESSES','HOME_GARDEN_STORE','HOME_HEALTH_CARE_SERVICE','HOME_INSPECTION','HOME_SECURITY','HOME_SERVICES','HOME_SITE','HOME_STAGING_SERVICE','HOME_THEATER_STORE','HOME_WINDOW_SERVICE','HOOKAH_LOUNGE','HORSEBACK_RIDING_SERVICE','HORSEDRAWN_VEHICLES','HORSE_RIDING_SCHOOL','HORSE_TRAINER','HOSPICE','HOSPITAL','HOSPITALITY_SERVICE','HOSTEL','HOTEL_BAR','HOTEL_LODGING','HOTEL_SUPPLY_SERVICE','HOT_AIR_BALLOONS','HOT_DOG_JOINT','HOT_POT_RESTAURANT','HOUSEHOLD_SUPPLIES','HOUSEWARES','HOUSE_PAINTER','HOUSE_SITTER','HOUSING_ASSISTANCE_SERVICE','HOUSING_HOMELESS_SHELTER','ICE_CREAM_PARLOR','ICE_SKATING','IG_EDITOR','ILLUSTRATOR','IMAGE_CONSULTANT','IMMIGRATION_LAWYER','INDEPENDENT_BOOKSTORE','INDEPENDENT_CHURCH','INDIAN_RESTAURANT','INDUSTRIALS_COMPANY','INFORMATION_TECHNOLOGY_COMPANY','INN','INSURANCE_AGENT','INSURANCE_BROKER','INSURANCE_COMPANY','INTERDENOMINATIONAL_CHURCH','INTERGOVERNMENTAL_ORGANIZATION','INTERIOR_DESIGNER','INTERNAL_MEDICINE','INTERNET_CAFE','INTERNET_COMPANY','INTERNET_LAWYER','INTERNET_MARKETING_SERVICE','INTERNET_SERVICE_PROVIDER','INVESTING_SERVICE','INVESTMENT_BANK','INVESTMENT_MANAGEMENT_COMPANY','IRISH_RESTAURANT','ISRAELI_RESTAURANT','ITALIAN_RESTAURANT','JAMAICAN_RESTAURANT','JANITORIAL_SERVICE','JAPANESE_RESTAURANT','JAZZ_CLUB','JET_SKI_RENTAL','JEWELRY_STORE','JEWELRY_SUPPLIER','JEWELRY_WATCHES','JEWELRY_WATCHES_COMPANY','JOBS_OCCUPATIONS','JOURNALIST','JUNKYARD','KARAOKE','KENNEL','KEYBOARDIST','KIDS_SITE','KINGDOM_HALL','KITCHEN_BATH_CONTRACTOR','KITEBOARDING','KOREAN_RESTAURANT','LABOR_EMPLOYMENT_LAW','LABOR_UNION','LANDSCAPING','LANGUAGE_SCHOOL','LASER_HAIR_REMOVAL','LASER_TAG','LASIK_LASER_EYE_SURGEON','LATIN_AMERICAN_RESTAURANT','LAUNDROMAT','LAW_ENFORCEMENT','LAW_FIRM','LEBANESE_RESTAURANT','LEGAL','LEGAL_SERVICES','LIFESTYLE_SERVICES','LIGHTHOUSE','LIGHTING_FIXTURES','LINGERIE_UNDERWEAR_STORE','LIQUOR_STORE','LITERARY_ARTS','LITERARY_EDITOR','LIVESTOCK_FARM','LIVE_MUSIC_VENUE','LIVE_RAW_FOOD_RESTAURANT','LOANS','LOBBYIST','LOCAL','LOCALITY','LOCAL_SERVICES','LOCKSMITH','LODGE','LOGGING_CONTRACTOR','LOTTERY_RETAILER','LOUNGE','LUMBER_YARD','MACHINE_SHOP','MAGAZINE','MAGICIAN','MAID_BUTLER','MAKEUP_ARTIST','MANAGEMENT_SERVICE','MANUFACTURING','MARINA','MARINE','MARINE_EQUIPMENT','MARINE_SERVICE_STATION','MARKET','MARKETING_AGENCY','MARKETING_CONSULTANT','MARKET_RESEARCH_CONSULTANT','MARRIAGE_THERAPIST','MARTIAL_ARTS','MASONRY','MASSAGE','MASSAGE_SCHOOL','MASSAGE_THERAPIST','MASTERING_ENGINEER','MATERNITY_CLINIC','MATERNITY_NURSING_CLOTHING_STORE','MATTRESSES_BEDDING','MATTRESS_MANUFACTURING','MEAT_WHOLESALER','MEDIA','MEDIA_AGENCY','MEDIA_CRITIC','MEDIA_NEWS_COMPANY','MEDIA_SHOW','MEDICAL_CENTER','MEDICAL_EQUIPMENT_MANUFACTURER','MEDICAL_EQUIPMENT_SUPPLIER','MEDICAL_HEALTH','MEDICAL_LAB','MEDICAL_RESEARCH','MEDICAL_SCHOOL','MEDICAL_SERVICE','MEDICAL_SPA','MEDICAL_SUPPLIES','MEDITATION_CENTER','MEDITERRANEAN_RESTAURANT','MENS_CLOTHING_STORE','MERCHANDISING_SERVICE','METAL_FABRICATOR','METAL_STEEL_COMPANY','METAL_SUPPLIER','METHODIST_CHURCH','MEXICAN_RESTAURANT','MIDDLE_EASTERN_RESTAURANT','MIDDLE_SCHOOL','MILITARY_BASE','MINIATURE_GOLF','MINING_COMPANY','MISSION','MOBILE_HOMES','MOBILE_PHONE_SHOP','MODEL','MODELING_AGENCY','MODERN_ART_MUSEUM','MODERN_EUROPEAN_RESTAURANT','MONARCH','MONUMENT','MORTGAGE_BROKERS','MOSQUE','MOTIVATIONAL_SPEAKER','MOTORCYCLES','MOTORCYCLE_MANUFACTURER','MOTORCYCLE_REPAIR','MOTORSPORTS_STORE','MOUNTAIN_BIKING_SHOP','MOVER','MOVIE','MOVIE_CHARACTER','MOVIE_CRITIC','MOVIE_TELEVISION_STUDIO','MOVIE_THEATRE','MOVIE_WRITER','MUSICAL_INSTRUMENT_STORE','MUSICIAN','MUSIC_AUDIO','MUSIC_AWARD','MUSIC_CHART','MUSIC_COMPILER','MUSIC_COMPOSER','MUSIC_CONDUCTOR','MUSIC_DIRECTOR','MUSIC_GENERAL','MUSIC_GENRE','MUSIC_INSTRUMENT','MUSIC_LESSONS_INSTRUCTION','MUSIC_PRODUCER','MUSIC_PRODUCTION','MUSIC_RECORDING_ENGINEER','MUSIC_STORE','MUSIC_VIDEO','NAIL_ARTIST','NAIL_SALON','NANNY','NATIONAL_PARK','NATURE_PRESERVE','NATUROPATH','NAZARENE_CHURCH','NCES_COLLEGE_GENERATED','NEAPOLITAN_RESTAURANT','NEIGHBORHOOD','NEUROLOGIST','NEWS_PERSONALITY','NEWS_SITE','NEW_AMERICAN_RESTAURANT','NGO','NIGHT_CLUB','NIGHT_MARKET','NONDENOMINATIONAL_CHURCH','NON_PROFIT','NOODLE_HOUSE','NORTH_INDIAN_RESTAURANT','NOTARY_PUBLIC','NOT_A_BIZ','NURSERIES_GARDENING_STORE','NURSING_AGENCY','NURSING_HOME','NURSING_SCHOOL','NUTRITIONIST','OBGYN','OBSERVATORY','OCCUPATIONAL_SAFETY','OCCUPATIONAL_THERAPIST','OCEAN','OFFICE_EQUIPMENT_STORE','OIL_LUBE_FILTER_SERVICE','ONCOLOGIST','ONSEN','OPERA_HOUSE','OPHTHALMOLOGIST','OPTICIAN','OPTOMETRIST','ORAL_SURGEON','ORCHESTRA','ORGANIC_GROCERY_STORE','ORGANIZATION','ORG_GENERAL','ORG_TYPE','ORTHODONTIST','ORTHOPEDISTS','ORTHOTICS_PROSTHETICS_SERVICE','OSTEOPATHIC_PHYSICIANS','OTHER_BIZ','OTOLARYNGOLOGIST','OUTDOOR_EQUIPMENT_STORE','OUTDOOR_PLACES','OUTLET_STORE','PACKAGING_SUPPLIES_EQUIPMENT','PADDLEBOARDING_CENTER','PAINTBALL','PAINTER','PAINTING_LESSONS','PAKISTANI_RESTAURANT','PALACE','PARK','PARKING','PARTY_CENTER','PARTY_SUPPLIES','PASSPORT_VISA_SERVICE','PATENT_TRADEMARK_COPYRIGHT_LAW','PATIO_GARDEN','PATROL_SECURITY','PAVING_ASPHALT_SERVICE','PAWN_SHOP','PEDIATRICS','PEDIATRIC_DENTIST','PENTECOSTAL_CHURCH','PERFORMANCE_ART','PERFORMING_ARTS','PERFORMING_ARTS_EDUCATION','PERIODONTIST','PERSON','PERSONAL_BLOG','PERSONAL_CHEF','PERSONAL_COACHING','PERSONAL_INJURY_LAWYER','PERSONAL_SITE','PERSONAL_TRAINER','PERUVIAN_RESTAURANT','PEST_CONTROL','PET','PETROLEUM_SERVICES','PETTING_ZOO','PET_ADOPTION_SERVICE','PET_BREEDER','PET_CAFE','PET_GROOMER','PET_SERVICE','PET_SITTER','PET_STORE','PET_SUPPLIES','PHARMACEUTICAL_COMPANY','PHARMACY','PHONE_TABLET','PHOTOGRAPHIC_SERVICES_EQUIPMENT','PHOTOGRAPHY_MUSEUM','PHYSICAL_THERAPIST','PIER','PILATES_STUDIO','PIZZA_PLACE','PLANETARIUM','PLASTIC_MANUFACTURER','PLASTIC_SURGERY','PLAYGROUND','PLAYLIST','PLUMBER','PODCAST','PODIATRIST','POET','POLICE_STATION','POLITICAL_CANDIDATE','POLITICAL_IDEOLOGY','POLITICAL_ORGANIZATION','POLITICAL_PARTY','POLITICIAN','POND','POOL_BILLIARDS','POPUP_SHOP','PORT','PORTABLE_BUILDING_SERVICE','PORTABLE_TOILET_RENTALS','PORTUGUESE_RESTAURANT','POST_OFFICE','POWDER_COATING_SERVICE','PREGNANCY_CHILDBIRTH_SERVICE','PRESBYTERIAN_CHURCH','PRESCHOOL','PRINTING_SERVICE','PRIVATE_INVESTIGATOR','PRIVATE_MEMBERS_CLUB','PRIVATE_PLANE_CHARTER','PRIVATE_SCHOOL','PRODUCER','PRODUCTION_COORDINATOR','PRODUCT_SERVICE','PROFESSIONAL_GAMER','PROFESSIONAL_NETWORKING','PROFESSIONAL_SPORTS_LEAGUE','PROFESSIONAL_SPORT_TEAM','PROMENADE','PROPERTY_MANAGEMENT','PROSTHODONTISTS','PSYCHIC','PSYCHOLOGIST','PSYCHOTHERAPIST','PUB','PUBLIC_FIGURE_TYPE','PUBLIC_GARDEN','PUBLIC_RELATIONS','PUBLIC_SCHOOL','PUBLIC_SERVICES','PUBLIC_SERVICES_GOVERNMENT','PUBLIC_SQUARE','PUBLIC_UTILITY','QUAY','RACE_TRACK','RADIOLOGISTS','RADIO_STATION','RAFTING_KAYAKING_COMPANY','RAILROAD','RAILWAY_STATION','RAMEN_RESTAURANT','RAPPER','REAL_ESTATE_AGENT','REAL_ESTATE_APPRAISER','REAL_ESTATE_COMPANY','REAL_ESTATE_DEVELOPER','REAL_ESTATE_INVESTMENT','REAL_ESTATE_LAWYER','REAL_ESTATE_SERVICE','REAL_ESTATE_TITLE_DEVELOPMENT','RECORD_LABEL','RECREATIONAL_VEHICLE_DEALER','RECREATION_CENTER','RECREATION_FITNESS_VENUE','RECREATION_SPOT','RECRUITER','RECYCLING_FACILITY','REC_SITE','REFRIGERATION_SALES_SERVICE','REF_SITE','REGIONAL_SITE','RELIGIOUS_BOOK_STORE','RELIGIOUS_CENTER','RELIGIOUS_ORGANIZATION','RELIGIOUS_SCHOOL','RENTAL_SHOP','RENT_TO_OWN_STORE','REPRODUCTIVE_SERVICES','REPTILE_PET_STORE','RESERVOIR','RESIDENCE_OTHER','RESORT','RESTAURANT','RESTAURANT_SUPPLY','RESTAURANT_WHOLESALE','RETAIL_BANK','RETAIL_COMPANY','RETIREMENT_ASSISTED_LIVING_FACILITY','ROBOTICS','ROCK_CLIMBING','ROCK_CLIMBING_SPOT','RODEO','ROLLER_SKATING_RINK','ROOFER','ROSE_GARDEN','RV_PARK','RV_RENTAL','RV_REPAIR','SAFETY_FIRST_AID_SERVICE','SAKE_BAR','SALAD_BAR','SALSA_CLUB','SALVADORAN_RESTAURANT','SAMGYETANG_RESTAURANT','SANDWICH_SHOP','SATIRE_PARODY','SCANDINAVIAN_RESTAURANT','SCHOOL','SCHOOL_FUNDRAISER','SCHOOL_TEAM','SCIENCE','SCIENCE_ENGINEERING','SCIENCE_MUSEUM','SCIENCE_SITE','SCIENCE_TECH','SCIENTIST','SCOOTER_RENTAL','SCREENWRITER','SCREEN_PRINTING_EMBROIDERY','SCUBA_DIVING','SCUBA_INSTRUCTOR','SCULPTOR','SCULPTURE_GARDEN','SEAFOOD_RESTAURANT','SEASONAL_STORE','SELFSTORAGE_FACILITY','SENIOR_CENTER','SET_ARTIST','SET_DESIGNER','SEVENTH_DAY_ADVENTIST_CHURCH','SEWER_SERVICE','SEWING_SEAMSTRESS','SEX_THERAPIST','SHAVED_ICE_SHOP','SHIPPING_SUPPLY_SERVICE','SHOE_REPAIR_SHOP','SHOE_STORE','SHOOTING_HUNTING_RANGE','SHOPPING_DISTRICT','SHOPPING_MALL','SHOPPING_SERVICE','SHREDDING_SERVICE','SIGHTSEEING_TOUR_AGENCY','SIGNS_BANNER_SERVICE','SIKH_TEMPLE','SINGER','SKATEBOARD_PARK','SKATE_SHOP','SKIN_CARE_SERVICES','SKI_RESORT','SKI_SNOWBOARD_SCHOOL','SKI_SNOWBOARD_SHOP','SKY_DIVING','SMOOTHIE_JUICE_BAR','SOCCER_FIELD','SOCCER_STADIUM','SOCIAL_CLUB','SOCIAL_MEDIA_AGENCY','SOCIAL_MEDIA_COMPANY','SOCIAL_SERVICES','SOCIETY_SITE','SOFTWARE','SOFTWARE_COMPANY','SOLAR_ENERGY_COMPANY','SOLAR_ENERGY_SERVICE','SONG','SONGWRITER','SORORITY_FRATERNITY','SOUL_FOOD_RESTAURANT','SOUND_ENGINEER','SOUTHERN_RESTAURANT','SOUTHWESTERN_RESTAURANT','SOUTH_AFRICAN_RESTAURANT','SOUVENIR_SHOP','SPA','SPANISH_RESTAURANT','SPA_BEAUTY_PERSONAL_CARE','SPEAKEASY','SPECIALTY_GROCERY_STORE','SPECIALTY_SCHOOL','SPEECH_PATHOLOGIST','SPEECH_THERAPIST','SPIRITUAL_LEADER','SPORTING_GOODS_STORE','SPORTS','SPORTSWEAR_STORE','SPORTS_AND_RECREATION','SPORTS_BAR','SPORTS_CLUB','SPORTS_EVENT','SPORTS_INSTRUCTION','SPORTS_LEAGUE','SPORTS_OUTDOORS','SPORTS_PROMOTER','SPORTS_TEAM','SPORTS_VENUE_STADIUM','SPORT_PSYCHOLOGLIST','STATE','STATELY_HOME','STATE_PARK','STATUE_FOUNTAIN','STD_TESTING_CENTER','STEAKHOUSE','STORAGE','STORAGE_SERVICE','STREET','STRING_MUSICIAN','STRUCTURAL_ENGINEER','STUNT_PERFORMER','SUNGLASSES_EYEWEAR_STORE','SUPERMARKET','SUPER_BUSINESS','SURFING_SPOT','SURF_SHOP','SURGEON','SURGICAL_CENTER','SURVEYOR','SUSHI_RESTAURANT','SWIMMING_INSTRUCTOR','SWIMMING_POOL','SWIMMING_POOL_CLEANER','SWIMMING_POOL_MAINTENANCE','SWIMWEAR_STORE','SYMPHONY','SYNAGOGUE','TACO_RESTAURANT','TAIWANESE_RESTAURANT','TALENT_AGENT','TALENT_MANAGER','TANNING_SALON','TANNING_SALON_SUPPLIER','TAPAS_BAR_RESTAURANT','TATTOO_PIERCING_SHOP','TAXI','TAXIDERMIST','TAX_LAWYER','TAX_PREPARATION','TEACHER','TEA_ROOM','TEETH_WHITENING','TELECOM','TELEVISION_SERVICE_PROVIDER','TEMPURA_RESTAURANT','TENNIS','TENNIS_STADIUM','TEPPANYAKI_RESTAURANT','TEST_PREPERATION_CENTER','TEXMEX_RESTAURANT','TEXTILES','THAI_RESTAURANT','THEATRE','THEATRICAL_PLAY','THEATRICAL_PRODUCTIONS','THEME_RESTAURANT','THERAPIST','THREADING_SERVICE','THRIFT_OR_CONSIGNMENT_STORE','TICKET_SALES','TIKI_BAR','TIRE_DEALER','TOBACCO_COMPANY','TOBACCO_STORE','TONKATSU_RESTAURANT','TOOLS_EQUIPMENT','TOPIC_AIRPORT','TOPIC_APPLIANCES','TOPIC_ARTS_ENTERTAINMENT','TOPIC_AUTOMOTIVE','TOPIC_BAR','TOPIC_BOOK_STORE','TOPIC_BUSINESS_SERVICES','TOPIC_CONCERT_VENUE','TOPIC_DOCTOR','TOPIC_EVENT','TOPIC_EVENT_PLANNING','TOPIC_FOOD_GROCERY','TOPIC_HOME_DECOR','TOPIC_HOME_IMPROVEMENT','TOPIC_HOTEL','TOPIC_ISLAND','TOPIC_JUST_FOR_FUN','TOPIC_KITCHEN_SUPPLIES','TOPIC_LAKE','TOPIC_LANDMARK','TOPIC_LIBRARY','TOPIC_MOUNTAIN','TOPIC_MUSEUM','TOPIC_NEWSPAPER','TOPIC_OFFICE_SUPPLIES','TOPIC_OTHER','TOPIC_PHOTOGRAPHER','TOPIC_PROFESSIONAL_SERVICES','TOPIC_PUBLISHER','TOPIC_REAL_ESTATE','TOPIC_RIVER','TOPIC_SHOPPING_RETAIL','TOPIC_SPORTS_RECREATION','TOPIC_TOURS_SIGHTSEEING','TOURIST_INFORMATION','TOUR_GUIDE','TOWING_SERVICE','TOWN_HALL','TOY_STORE','TRACK_STADIUM','TRADE_SCHOOL','TRAFFIC_SCHOOL','TRAILER_DEARLERSHIP','TRAILER_RENTAL','TRAIN_STATION','TRANSIT_STOP','TRANSIT_SYSTEM','TRANSLATOR','TRANSPORTATION_SERVICE','TRAVEL_AGENCY','TRAVEL_COMPANY','TRAVEL_LEISURE','TRAVEL_SERVICES','TRAVEL_SITE','TRAVEL_TRANSPORTATION','TREE_CUTTING_SERVICE','TROPHIES_ENGRAVING','TRUCK_RENTAL','TRUCK_REPAIR_SHOP','TURKISH_RESTAURANT','TUTORING','TV_CHANNEL','TV_GENERAL','TV_MOVIES','TV_MOVIE_AWARD','TV_NETWORK','TV_SERIES_SEASON','TV_SHOW','UNAGI_RESTAURANT','UNIFORM_SUPPLIER','UNIVERSITY','URBAN_FARM','UROLOGISTS','USED_VEHICLES','VACATION_HOME_RENTAL','VEGETARIAN_VEGAN_RESTAURANT','VENDING_MACHINE_SERVICE','VENEZUELAN_RESTAURANT','VETERINARIAN','VIDEO','VIDEOGRAPHER','VIDEO_CREATOR','VIDEO_GAMES','VIDEO_GAME_CRITIC','VIDEO_GAME_DESIGNER','VIDEO_GAME_PRODUCER','VIDEO_GAME_PROGRAMMER','VIDEO_GAME_STORE','VIETNAMESE_RESTAURANT','VILLAGE','VINTAGE_STORE','VISUAL_ARTS','VISUAL_ART_DIRECTOR','VISUAL_EFFECTS_ARTIST','VISUAL_EFFECTS_DIRECTOR','VITAMIN_SUPPLEMENTS','VITAMIN_SUPPLEMENT_SHOP','VOICE_ACTOR','VOLLEYBALL_COURT','WAGASHI_RESTAURANT','WASTE_MANAGEMENT','WATERFALL','WATER_HEATER_INSTALLATION_REPAIR_SERVICE','WATER_PARK','WATER_TREATMENT_PLANT','WATER_UTILITY_COMPANY','WAXING_SERVICE','WEBSITE','WEB_DESIGN','WEDDING_PLANNING','WEDDING_VENUE','WEIGHT_LOSS_CENTER','WELL_WATER_DRILLING_SERVICE','WHEEL_RIM_REPAIR_SHOP','WHISKY_BAR','WHOLESALE_BAKERY','WHOLESALE_GROCER','WHOLESALE_SUPPLY_STORE','WIG_STORE','WILDLIFE_SANCTUARY','WILLS_ESTATE_LAWYER','WINDOW_SERVICE_REPAIR','WINDOW_TINTING_SERVICE','WIND_MUSICIAN','WINERY_VINEYARD','WINE_BAR','WINE_SPIRITS','WOMENS_CLOTHING_STORE','WOMENS_HEALTH_CLINIC','WORKPLACE_OFFICE','WRITING_SERVICE','YAKINIKU_RESTAURANT','YAKITORI_RESTAURANT','YOGA_PILATES','YOUTH_ORGANIZATION','ZOO']

    const youtubeCountryList = ['','Afghanistan','Albania','Algeria','American Samoa','Andorra','Angola','Anguilla','Antarctica','Antigua and Barbuda','Argentina','Armenia','Aruba','Australia','Austria','Azerbaijan','Bahamas','Bahrain','Bangladesh','Barbados','Belarus','Belgium','Belize','Benin','Bermuda','Bhutan','Bolivia','Bosnia & Herzegovina','Bosnia and Herzegovina','Botswana','Bouvet Island','British Indian Ocean Territory','British Virgin Islands','Brazil','Brunei','Bulgaria','Burkina Faso','Burundi','Cabo Verde','Cambodia','Cameroon','Canada','Cape Verde','Caribbean Netherlands','Cayman Islands','Central African Republic','Chad','Chile','China','Christmas Island','Cocos (Keeling) Islands','Cocos Islands','Colombia','Comoros','Congo - Kinshasa','Cook Islands','Costa Rica','Croatia','Cuba','Curacao','Curaçao','Cyprus','Czech Republic','Czechia','Côte d’Ivoire','Democratic Republic of the Congo','Denmark','Djibouti','Dominica','Dominican Republic','East Timor','Ecuador','Egypt','El Salvador','Equatorial Guinea','Eritrea','Estonia','Ethiopia','Falkland Islands','Faroe Islands','Fiji','Finland','France','French Guiana','French Polynesia','French Southern Territories','Gabon','Gambia','Georgia','Germany','Ghana','Gibraltar','Greece','Greenland','Grenada','Guadeloupe','Guam','Guatemala','Guernsey','Guinea','Guinea-Bissau','Guyana','Haiti','Heard & McDonald Islands','Honduras','Hong Kong','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland','Isle of Man','Israel','Italy','Ivory Coast','Jamaica','Japan','Jersey','Jordan','Kazakhstan','Kenya','Kiribati','Kuwait','Kyrgyzstan','Laos','Latvia','Lebanon','Lesotho','Liberia','Libya','Liechtenstein','Lithuania','Luxembourg','Macao','Macau','Macedonia','Madagascar','Malawi','Malaysia','Maldives','Mali','Malta','Marshall Islands','Martinique','Mauritania','Mauritius','Mayotte','Mexico','Micronesia','Moldova','Monaco','Mongolia','Montenegro','Montserrat','Morocco','Mozambique','Myanmar (Burma)','Myanmar','Namibia','Nepal','Netherlands','New Caledonia','New Zealand','Nicaragua','Niger','Nigeria','Niue','North Korea','North Macedonia','Northern Mariana Islands','Norway','Oman','Pakistan','Palau','Palestine','Panama','Papua New Guinea','Paraguay','Peru','Philippines','Pitcairn','Poland','Portugal','Puerto Rico','Qatar','Republic of the Congo','Reunion','Romania','Russia','Rwanda','Réunion','Saint Barthelemy','Saint Helena','Saint Kitts and Nevis','Saint Lucia','Saint Martin','Saint Pierre and Miquelon','Saint Vincent and the Grenadines','Samoa','San Marino','Saudi Arabia','Senegal','Serbia','Seychelles','Sierra Leone','Singapore','Slovakia','Slovenia','Solomon Islands','Somalia','South Africa','South Georgia & South Sandwich Islands','South Korea','South Sudan','Spain','Sri Lanka','Sudan','Suriname','Svalbard and Jan Mayen','Swaziland','Sweden','Switzerland','Syria','Taiwan','Tajikistan','Tanzania','Thailand','Timor-Leste','Togo','Tonga','Trinidad & Tobago','Trinidad and Tobago','Tunisia','Turkey','Turkmenistan','Turks and Caicos Islands','Tuvalu','Türkiye','U.S. Outlying Islands','U.S. Virgin Islands','Uganda','Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan','Vanuatu','Vatican City','Vatican','Venezuela','Vietnam','Wallis & Futuna','Wallis and Futuna','Western Sahara','Yemen','Zambia','Zimbabwe','Åland Islands']

    return(
        <div className={`w-full md:w-96 py-6 h-auto md:h-full md:overflow-y-scroll md:no-scrollbar ${collapsed?'bg-zBlueGreen-500':'bg-zYellow-500'} md:bg-zYellow-500 text-softBlack-500 transition-all duration-300 border-0 border-zYellow-500 md:border-2 md:border-softBlack-500 md:ml-4 md:shadow-harsh10px`}>
            <div className={`z-20 text-softBlack-500 font-bold mt-2 mb-2 md:mb-0 ml-4 ${collapsed===true?'text-2xl':'text-4xl'} transition-all duration-300`}>Search</div>

            <div className={`mx-4${collapsed === true? 'hidden opacity-0':'block opacity-100'}`}>
                {/* collapsible */}
                <div className={`px-4 py-6 md:py-2 text-softBlack-500 font-bold ${collapsed === true? 'hidden opacity-0':'block opacity-100'}`}>Platform</div>
                <select 
                    className={`mx-4 px-4 py-2 shadow-harsh5px hover:shadow-harsh10px border-softBlack-500 border-2 hover:bg-zPink-500 transition-all duration-300 ${collapsed === true? 'hidden':'block'}`}
                    onChange={(e)=>platformChange(e.target.value)}
                    value={platform}
                >
                    <option value='Instagram'>Instagram</option>
                    <option value='Youtube'>Youtube</option>
                </select>
                <div className={`max-w-full ${(collapsed === true || platform!='Instagram')? 'hidden':'block'}`}>
                    {/* Instagram Filters */}
                    <div className={`px-4 py-6 md:py-2 text-softBlack-500 font-bold`}>Instagram ID</div>
                    <input 
                        type='text'
                        placeholder='Instagram ID'
                        className={`ml-4 px-4 py-2 shadow-harsh5px hover:shadow-harsh10px text-softBlack-500 border-softBlack-500 border-2 transition-all duration-300 ${(collapsed === true || platform!='Instagram')? 'hidden':'block'}`}
                        onChange={(e)=>setInstagramId(e.target.value)}
                        value={instagramId}
                    />
                    <div className={`px-4 py-6 md:py-2 text-softBlack-500 font-bold`}>Country</div>
                    {/* <input 
                        type='text'
                        placeholder='Country'
                        className={`ml-4 px-4 py-2 text-black border-black border-2 ${collapsed === true? 'hidden':'block'}`}
                        onChange={(e)=>setLocation(e.target.value)}
                        value={location}
                    /> */}
                    <select 
                        className={`mx-4 w-72 px-4 py-2 shadow-harsh5px hover:shadow-harsh10px border-softBlack-500 border-2 hover:bg-zPink-500 transition-all duration-300`}
                        onChange={(e)=>setLocation(e.target.value)}
                        value={location}
                    >
                        {
                            countryOptions.map((country) => (
                                <option key={country} value={country}>{country}</option>
                            ))
                        }
                    </select>
                    <div className={`px-4 pt-6 md:pt-3 text-softBlack-500 font-bold`}>Followers</div>
                    <div className={`px-4 text-sm text-softBlack-500 font-bold`}>Minimum Followers</div>
                    <input 
                        type='number'
                        placeholder='Minimum followers'
                        className={`ml-4 px-4 py-2 border-softBlack-500 border-2 shadow-harsh5px hover:shadow-harsh10px transition-all duration-300`}
                        onChange={(e)=>setMinFollowers(e.target.value)}
                        value={minFollowers}
                    />
                    <div className={`px-4 mt-4 md:mt-2 text-sm text-softBlack-500 font-bold`}>Maximum Followers</div>
                    <input 
                        type='number'
                        placeholder='Maximum followers'
                        className={`ml-4 px-4 py-2 border-softBlack-500 border-2 shadow-harsh5px hover:shadow-harsh10px transition-all duration-300`}
                        onChange={(e)=>setMaxFollowers(e.target.value)}
                        value={maxFollowers}
                    />
                    <div className={`px-4 py-6 md:py-2 text-softBlack-500 font-bold`}>Category</div>
                    {/* <input 
                        type='text'
                        placeholder='Category'
                        className={`ml-4 px-4 py-2 border-black border-2 ${collapsed === true? 'hidden':'block'}`}
                        onChange={(e)=>setCategory(e.target.value)}
                        value={category}
                    /> */}
                    <select 
                        className={`mx-4 px-4 md:px-2 py-2 w-72 shadow-harsh5px hover:shadow-harsh10px border-softBlack-500 border-2 hover:bg-zPink-500 transition-all duration-300`}
                        onChange={(e)=>setCategory(e.target.value)}
                        value={category}
                    >
                        {
                            categoryOptions.map((category) => (
                                <option key={category} value={category} className="max-w-full mx-4">{category}</option>
                            ))
                        }
                    </select>
                    <div className={`px-4 py-6 md:py-2 text-softBlack-500 font-bold`}>Tags</div>
                    <div className="flex flex-wrap md:mx-4 max-w-full">
                        <input 
                            type='text'
                            placeholder='Tags'
                            className={`ml-4 md:ml-0 px-4 py-2 md:py-0 border-softBlack-500 border-2 shadow-harsh5px hover:shadow-harsh10px transition-all duration-300`}
                            onChange={(e)=>setNTag(e.target.value)}
                            value={nTag}
                        />
                        <div className="border-2 border-softBlack-500 mx-4 px-2 py-2 bg-zGreen-500 shadow-harsh5px hover:shadow-harsh10px max-w-fit my-2 transition-all duration-300 active:scale-90 active:shadow-harsh5px" onClick={addTag}>+</div>
                        <div className="border-2 border-softBlack-500 px-2 py-2 bg-zGreen-500 shadow-harsh5px hover:shadow-harsh10px max-w-fit my-2 transition-all duration-300 active:scale-90 active:shadow-harsh5px" onClick={clearTag}>Clear</div>
                    </div>
                    <div className="mx-4 flex flex-wrap mt-4">
                        <ArrayElements 
                            items={tags}
                        />
                    </div>
                    <div className={`px-4 py-6 md:py-0 text-softBlack-500 font-bold`}>Average Likes</div>
                    <input 
                        type='number'
                        placeholder='Average Likes'
                        className={`ml-4 px-4 py-2 border-softBlack-500 border-2 shadow-harsh5px hover:shadow-harsh10px transition-all duration-300`}
                        onChange={(e)=>setAvgLikes(e.target.value)}
                        value={avgLikes}
                    />
                    <div className={`px-4 py-6 md:py-2 text-softBlack-500 font-bold`}>Average Comments</div>
                    <input 
                        type='number'
                        placeholder='Average Comments'
                        className={`ml-4 px-4 py-2 border-softBlack-500 border-2 shadow-harsh5px hover:shadow-harsh10px transition-all duration-300`}
                        onChange={(e)=>setAvgComments(e.target.value)}
                        value={avgComments}
                    />
                </div>

                <div className={`${(collapsed === true || platform!='Youtube')? 'hidden':'block'}`}>
                    {/* Youtube Filters */}
                    <div className={`px-4 py-6 md:py-2 text-softBlack-500 font-bold`}>Subscribers</div>
                    <div className={`px-4 text-sm text-softBlack-500 font-bold`}>Minimum Subscribers</div>
                    <input 
                        type='number'
                        placeholder='Minimum Subscribers'
                        className={`ml-4 px-4 py-2 border-softBlack-500 border-2 shadow-harsh5px hover:shadow-harsh10px transition-all duration-300`}
                        onChange={(e)=>setMinYoutubeSubscribers(e.target.value)}
                        value={minSubscribers}
                    />
                    <div className={`px-4 mt-4 md:mt-2 text-sm text-softBlack-500 font-bold`}>Maximum Subscribers</div>
                    <input 
                        type='number'
                        placeholder='Maximum Subscribers'
                        className={`ml-4 px-4 py-2 border-softBlack-500 border-2 shadow-harsh5px hover:shadow-harsh10px transition-all duration-300`}
                        onChange={(e)=>setMaxYoutubeSubscribers(e.target.value)}
                        value={maxSubscribers}
                    />
                    <div className={`px-4 mt-4 md:mt-2 text-sm text-softBlack-500 font-bold`}>Topics</div>
                    <div className="flex flex-wrap">
                        <select 
                            className={`mx-4 w-72 px-4 py-2 shadow-harsh5px hover:shadow-harsh10px border-softBlack-500 border-2 transition-all duration-300`}
                            onChange={(e)=>setTopic(e.target.value)}
                            value={topic}
                        >
                            {
                                topicSet.map((topic) => (
                                    <option key={topic.key} value={topic.tag}>{topic.name}, {topic.category}, with {topic.channelCnt} channels</option>
                                ))
                            }
                        </select>
                        <div className="border-2 border-softBlack-500 mx-4 px-2 py-2 bg-zGreen-500 shadow-harsh5px hover:shadow-harsh10px max-w-fit my-2 transition-all duration-300 active:scale-90 active:shadow-harsh5px" onClick={addTopic}>+</div>
                        <div className="border-2 border-softBlack-500 px-2 py-2 bg-zGreen-500 shadow-harsh5px hover:shadow-harsh10px max-w-fit my-2 transition-all duration-300 active:scale-90 active:shadow-harsh5px" onClick={clearTopic}>Clear</div>
                    </div>
                    <div className="flex flex-wrap mx-4">
                        <ArrayElements 
                            items={topicList}
                        />
                    </div>
                    <div className={`px-4 mt-4 md:mt-2 text-sm text-softBlack-500 font-bold`}>Niches</div>
                    <div className="flex flex-wrap">
                        <select 
                            className={`mx-4 w-72 px-4 py-2 shadow-harsh5px hover:shadow-harsh10px border-softBlack-500 border-2 transition-all duration-300`}
                            onChange={(e)=>setNiche(e.target.value)}
                            value={niche}
                        >
                            {
                                nicheSet.map((niche) => (
                                    <option key={niche.key} value={niche.tag}>{niche.name}, {niche.category}, with {niche.channelCnt} channels</option>
                                ))
                            }
                        </select>
                        <div className="border-2 border-softBlack-500 mx-4 px-2 py-2 bg-zGreen-500 shadow-harsh5px hover:shadow-harsh10px max-w-fit my-2 transition-all duration-300 active:scale-90 active:shadow-harsh5px" onClick={addNiche}>+</div>
                        <div className="border-2 border-softBlack-500 px-2 py-2 bg-zGreen-500 shadow-harsh5px hover:shadow-harsh10px max-w-fit my-2 transition-all duration-300 active:scale-90 active:shadow-harsh5px" onClick={clearNiche}>Clear</div>
                    </div>
                    <div className="flex flex-wrap mx-4">
                        <ArrayElements 
                            items={nicheList}
                        />
                    </div>
                    <div className={`px-4 py-6 md:py-2 text-softBlack-500 font-bold`}>Average Likes</div>
                    <input 
                        type='number'
                        placeholder='Average Likes'
                        className={`ml-4 px-4 py-2 border-softBlack-500 border-2 shadow-harsh5px hover:shadow-harsh10px transition-all duration-300`}
                        onChange={(e)=>setAvgYoutubeLikes(e.target.value)}
                        value={avgYoutubeLikes}
                    />
                    <div className={`px-4 py-6 md:py-2 text-softBlack-500 font-bold`}>Average Comments</div>
                    <input 
                        type='number'
                        placeholder='Average Comments'
                        className={`ml-4 px-4 py-2 border-softBlack-500 border-2 shadow-harsh5px hover:shadow-harsh10px transition-all duration-300`}
                        onChange={(e)=>setAvgYoutubeComments(e.target.value)}
                        value={avgYoutubeComments}
                    />
                    <div className={`px-4 py-6 md:py-2 text-softBlack-500 font-bold`}>Views</div>
                    <div className={`px-4 text-sm text-softBlack-500 font-bold`}>Minimum Average Views</div>
                    <input 
                        type='number'
                        placeholder='Minimum Views'
                        className={`ml-4 px-4 py-2 border-softBlack-500 border-2 shadow-harsh5px hover:shadow-harsh10px transition-all duration-300`}
                        onChange={(e)=>setAvgMinYoutubeViews(e.target.value)}
                        value={avgYoutubeMinViews}
                    />
                    <div className={`px-4 mt-4 md:mt-2 text-sm text-softBlack-500 font-bold`}>Maximum Average Views</div>
                    <input 
                        type='number'
                        placeholder='Maximum Views'
                        className={`ml-4 px-4 py-2 border-softBlack-500 border-2 shadow-harsh5px hover:shadow-harsh10px transition-all duration-300`}
                        onChange={(e)=>setAvgMaxYoutubeViews(e.target.value)}
                        value={avgYoutubeMaxViews}
                    />
                    <div className={`px-4 pt-6 pb-6 md:pb-2 text-softBlack-500 font-bold`}>Audience Country</div>
                    <select 
                        className={`mx-4 px-4 py-2 md:w-4/5 shadow-harsh5px hover:shadow-harsh10px border-softBlack-500 border-2 hover:bg-zPink-500 transition-all duration-300`}
                        onChange={(e)=>setAudienceCountry(e.target.value)}
                        value={audienceCountry}
                    >
                        {
                            youtubeCountryList.map((country) => (
                                <option key={country} value={country}>{country}</option>
                            ))
                        }
                    </select>
                    <div className={`px-4 py-6 text-softBlack-500 font-bold`}>Audience Gender Ratios</div>
                    <div className={`px-4 text-sm text-softBlack-500 font-bold`}>Male Audience Ratio</div>
                    <input 
                        type='number'
                        placeholder='Audience Male Ratio'
                        className={`ml-4 px-4 py-2 border-softBlack-500 border-2 shadow-harsh5px hover:shadow-harsh10px transition-all duration-300`}
                        onChange={(e)=>setAudienceMaleRatio(e.target.value)}
                        value={audienceMaleRatio}
                    />
                    <div className={`px-4 mt-4 text-sm text-softBlack-500 font-bold`}>Female Audience Ratio</div>
                    <input 
                        type='number'
                        placeholder='Audience Female Ratio'
                        className={`ml-4 px-4 py-2 border-softBlack-500 border-2 shadow-harsh5px hover:shadow-harsh10px transition-all duration-300`}
                        onChange={(e)=>setAudienceFemaleRatio(e.target.value)}
                        value={audienceFemaleRatio}
                    />
                    <div className={`px-4 py-6 text-softBlack-500 font-bold`}>Audience Average Age</div>
                    <div className={`px-4 text-sm text-softBlack-500 font-bold`}>Minimum Audience Age</div>
                    <input 
                        type='number'
                        placeholder='Audience Minimum Age'
                        className={`ml-4 px-4 py-2 border-softBlack-500 border-2 shadow-harsh5px hover:shadow-harsh10px transition-all duration-300`}
                        onChange={(e)=>setAudienceMinAge(e.target.value)}
                        value={audienceMinAge}
                    />
                    <div className={`px-4 mt-4 text-sm text-softBlack-500 font-bold`}>Maximum Audience Age</div>
                    <input 
                        type='number'
                        placeholder='Audience Minimum Age'
                        className={`ml-4 px-4 py-2 border-softBlack-500 border-2 shadow-harsh5px hover:shadow-harsh10px transition-all duration-300`}
                        onChange={(e)=>setAudienceMaxAge(e.target.value)}
                        value={audienceMaxAge}
                    />
                </div>
                <div className={`bg-zGreen-500 border-2 shadow-harsh5px hover:shadow-harsh10px border-softBlack-500 mx-4 my-4 flex flex-col items-center font-bold hover:bg-zPink-500 transition-all duration-300 text-xl active:scale-90 active:shadow-harsh5px hover:rounded-2xl ${collapsed?'hidden':'block'}`} onClick={createPreset}>Add Preset</div>
                <div className={`bg-zGreen-500 border-2 shadow-harsh5px hover:shadow-harsh10px border-softBlack-500 mx-4 my-4 flex flex-col items-center font-bold hover:bg-zPink-500 transition-all duration-300 text-xl active:scale-90 active:shadow-harsh5px hover:rounded-2xl ${collapsed?'hidden':'block'}`} onClick={searchHandler}>Search</div>
            </div>
            <div className={`text-softBlack-500 font-bold my-4 mx-4 shadow-harsh5px hover:shadow-harsh10px border-softBlack-500 border-2 min-w-screen right-4 flex flex-col items-center bg-zPink-500 hover:bg-zGreen-500 transition-all duration-300 active:scale-90 active:shadow-harsh5px hover:rounded-2xl md:hidden`} onClick={collapseHandler}>{buttonText}</div>       
        </div>
    );
}