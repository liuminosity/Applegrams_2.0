var Board = Backbone.Model.extend({

  initialize: function () {

    this.width = 17;
    this.height = 15;

    this.switchPieces = function (x, y, X, Y) {
      var hold = this.letter(x, y);
      this.addPiece(x, y, this.letter(X, Y));
      this.addPiece(X, Y, hold);
    };

    this.moveToEmptySpot = function (x, y, X, Y) {
      var hold = this.removePiece(x, y);
      this.addPiece(X, Y, hold);
    };

    this.addPiece = function (x, y, value) {
      this.letter(x, y, value);
      this.colorWord(x, y);
    };

    this.removePiece = function (x, y) {
      var piece = this.letter(x, y);
      this.letter(x, y, 0);
      this.matrix[y][x].row = 0;
      this.matrix[y][x].col = 0;
      this.updateWords(x, y);
      return piece;
    };

    //updateWords is used by the removePiece function, as, when a piece is removed from the board, any piece that was in contact with it is effected...
    this.updateWords = function (x, y) {
      this.colorWord(x+1, y);
      this.colorWord(x-1, y);
      this.colorWord(x, y+1);
      this.colorWord(x, y-1);
    },

    //TEMPORARY until Anthony shows me how to search all scrabble words better
    this.words = ["AA","AB","AD","AE","AG","AH","AI","AL","AM","AN","AR","AS","AT","AW","AX","AY","BA","BE","BI","BO","BY","DE","DO","ED","EF","EH","EL","EM","EN","ER","ES","ET","EX","FA","FE","GO","HA","HE","HI","HM","HO","ID","IF","IN","IS","IT","JO","KA","KI","LA","LI","LO","MA","ME","MI","MM","MO","MU","MY","NA","NE","NO","NU","OD","OE","OF","OH","OI","OM","ON","OP","OR","OS","OW","OX","OY","PA","PE","PI","QI","RE","SH","SI","SO","TA","TI","TO","UH","UM","UN","UP","US","UT","WE","WO","XI","XU","YA","YE","YO","ZA", "AAH","AAL","AAS","ABA","ABO","ABS","ABY","ACE","ACT","ADD","ADO","ADS","ADZ","AFF","AFT","AGA","AGE","AGO","AGS","AHA","AHI","AHS","AID","AIL","AIM","AIN","AIR","AIS","AIT","ALA","ALB","ALE","ALL","ALP","ALS","ALT","AMA","AMI","AMP","AMU","ANA","AND","ANE","ANI","ANT","ANY","APE","APO","APP","APT","ARB","ARC","ARE","ARF","ARK","ARM","ARS","ART","ASH","ASK","ASP","ASS","ATE","ATT","AUK","AVA","AVE","AVO","AWA","AWE","AWL","AWN","AXE","AYE","AYS","AZO","BAA","BAD","BAG","BAH","BAL","BAM","BAN","BAP","BAR","BAS","BAT","BAY","BED","BEE","BEG","BEL","BEN","BES","BET","BEY","BIB","BID","BIG","BIN","BIO","BIS","BIT","BIZ","BOA","BOB","BOD","BOG","BOO","BOP","BOS","BOT","BOW","BOX","BOY","BRA","BRO","BRR","BUB","BUD","BUG","BUM","BUN","BUR","BUS","BUT","BUY","BYE","BYS","CAB","CAD","CAM","CAN","CAP","CAR","CAT","CAW","CAY","CEE","CEL","CEP","CHI","CIG","CIS","COB","COD","COG","COL","CON","COO","COP","COR","COS","COT","COW","COX","COY","COZ","CRU","CRY","CUB","CUD","CUE","CUM","CUP","CUR","CUT","CWM","DAB","DAD","DAG","DAH","DAK","DAL","DAM","DAN","DAP","DAW","DAY","DEB","DEE","DEF","DEL","DEN","DEV","DEW","DEX","DEY","DIB","DID","DIE","DIF","DIG","DIM","DIN","DIP","DIS","DIT","DOC","DOE","DOG","DOL","DOM","DON","DOR","DOS","DOT","DOW","DRY","DUB","DUD","DUE","DUG","DUH","DUI","DUN","DUO","DUP","DYE","EAR","EAT","EAU","EBB","ECU","EDH","EDS","EEK","EEL","EFF","EFS","EFT","EGG","EGO","EKE","ELD","ELF","ELK","ELL","ELM","ELS","EME","EMS","EMU","END","ENG","ENS","EON","ERA","ERE","ERG","ERN","ERR","ERS","ESS","ETA","ETH","EVE","EWE","EYE","FAB","FAD","FAG","FAN","FAR","FAS","FAT","FAX","FAY","FED","FEE","FEH","FEM","FEN","FER","FES","FET","FEU","FEW","FEY","FEZ","FIB","FID","FIE","FIG","FIL","FIN","FIR","FIT","FIX","FIZ","FLU","FLY","FOB","FOE","FOG","FOH","FON","FOP","FOR","FOU","FOX","FOY","FRO","FRY","FUB","FUD","FUG","FUN","FUR","GAB","GAD","GAE","GAG","GAL","GAM","GAN","GAP","GAR","GAS","GAT","GAY","GED","GEE","GEL","GEM","GEN","GET","GEY","GHI","GIB","GID","GIE","GIG","GIN","GIP","GIT","GNU","GOA","GOB","GOD","GOO","GOR","GOS","GOT","GOX","GOY","GUL","GUM","GUN","GUT","GUV","GUY","GYM","GYP","HAD","HAE","HAG","HAH","HAJ","HAM","HAO","HAP","HAS","HAT","HAW","HAY","HEH","HEM","HEN","HEP","HER","HES","HET","HEW","HEX","HEY","HIC","HID","HIE","HIM","HIN","HIP","HIS","HIT","HMM","HOB","HOD","HOE","HOG","HON","HOP","HOS","HOT","HOW","HOY","HUB","HUE","HUG","HUH","HUM","HUN","HUP","HUT","HYP","ICE","ICH","ICK","ICY","IDS","IFF","IFS","IGG","ILK","ILL","IMP","INK","INN","INS","ION","IRE","IRK","ISM","ITS","IVY","JAB","JAG","JAM","JAR","JAW","JAY","JEE","JET","JEU","JEW","JIB","JIG","JIN","JOB","JOE","JOG","JOT","JOW","JOY","JUG","JUN","JUS","JUT","KAB","KAE","KAF","KAS","KAT","KAY","KEA","KEF","KEG","KEN","KEP","KEX","KEY","KHI","KID","KIF","KIN","KIP","KIR","KIS","KIT","KOA","KOB","KOI","KOP","KOR","KOS","KUE","KYE","LAB","LAC","LAD","LAG","LAM","LAP","LAR","LAS","LAT","LAV","LAW","LAX","LAY","LEA","LED","LEE","LEG","LEI","LEK","LES","LET","LEU","LEV","LEX","LEY","LEZ","LIB","LID","LIE","LIN","LIP","LIS","LIT","LOB","LOG","LOO","LOP","LOT","LOW","LOX","LUG","LUM","LUV","LUX","LYE","MAC","MAD","MAE","MAG","MAN","MAP","MAR","MAS","MAT","MAW","MAX","MAY","MED","MEG","MEL","MEM","MEN","MET","MEW","MHO","MIB","MIC","MID","MIG","MIL","MIM","MIR","MIS","MIX","MOA","MOB","MOC","MOD","MOG","MOL","MOM","MON","MOO","MOP","MOR","MOS","MOT","MOW","MUD","MUG","MUM","MUN","MUS","MUT","MYC","NAB","NAE","NAG","NAH","NAM","NAN","NAP","NAW","NAY","NEB","NEE","NEG","NET","NEW","NIB","NIL","NIM","NIP","NIT","NIX","NOB","NOD","NOG","NOH","NOM","NOO","NOR","NOS","NOT","NOW","NTH","NUB","NUN","NUS","NUT","OAF","OAK","OAR","OAT","OBA","OBE","OBI","OCA","ODA","ODD","ODE","ODS","OES","OFF","OFT","OHM","OHO","OHS","OIL","OKA","OKE","OLD","OLE","OMS","ONE","ONO","ONS","OOH","OOT","OPE","OPS","OPT","ORA","ORB","ORC","ORE","ORS","ORT","OSE","OUD","OUR","OUT","OVA","OWE","OWL","OWN","OXO","OXY","PAC","PAD","PAH","PAL","PAM","PAN","PAP","PAR","PAS","PAT","PAW","PAX","PAY","PEA","PEC","PED","PEE","PEG","PEH","PEN","PEP","PER","PES","PET","PEW","PHI","PHT","PIA","PIC","PIE","PIG","PIN","PIP","PIS","PIT","PIU","PIX","PLY","POD","POH","POI","POL","POM","POO","POP","POT","POW","POX","PRO","PRY","PSI","PST","PUB","PUD","PUG","PUL","PUN","PUP","PUR","PUS","PUT","PYA","PYE","PYX","QAT","QIS","QUA","RAD","RAG","RAH","RAI","RAJ","RAM","RAN","RAP","RAS","RAT","RAW","RAX","RAY","REB","REC","RED","REE","REF","REG","REI","REM","REP","RES","RET","REV","REX","RHO","RIA","RIB","RID","RIF","RIG","RIM","RIN","RIP","ROB","ROC","ROD","ROE","ROM","ROT","ROW","RUB","RUE","RUG","RUM","RUN","RUT","RYA","RYE","SAB","SAC","SAD","SAE","SAG","SAL","SAP","SAT","SAU","SAW","SAX","SAY","SEA","SEC","SEE","SEG","SEI","SEL","SEN","SER","SET","SEW","SEX","SHA","SHE","SHH","SHY","SIB","SIC","SIM","SIN","SIP","SIR","SIS","SIT","SIX","SKA","SKI","SKY","SLY","SOB","SOD","SOL","SOM","SON","SOP","SOS","SOT","SOU","SOW","SOX","SOY","SPA","SPY","SRI","STY","SUB","SUE","SUK","SUM","SUN","SUP","SUQ","SYN","TAB","TAD","TAE","TAG","TAJ","TAM","TAN","TAO","TAP","TAR","TAS","TAT","TAU","TAV","TAW","TAX","TEA","TED","TEE","TEG","TEL","TEN","TET","TEW","THE","THO","THY","TIC","TIE","TIL","TIN","TIP","TIS","TIT","TOD","TOE","TOG","TOM","TON","TOO","TOP","TOR","TOT","TOW","TOY","TRY","TSK","TUB","TUG","TUI","TUN","TUP","TUT","TUX","TWA","words","TYE","UDO","UGH","UKE","ULU","UMM","UMP","UNS","UPO","UPS","URB","URD","URN","URP","USE","UTA","UTE","UTS","VAC","VAN","VAR","VAS","VAT","VAU","VAV","VAW","VEE","VEG","VET","VEX","VIA","VID","VIE","VIG","VIM","VIS","VOE","VOW","VOX","VUG","VUM","WAB","WAD","WAE","WAG","WAN","WAP","WAR","WAS","WAT","WAW","WAX","WAY","WEB","WED","WEE","WEN","WET","WHA","WHO","WHY","WIG","WIN","WIS","WIT","WIZ","WOE","WOG","WOK","WON","WOO","WOP","WOS","WOT","WOW","WRY","WUD","WYE","WYN","XIS","YAG","YAH","YAK","YAM","YAP","YAR","YAW","YAY","YEA","YEH","YEN","YEP","YES","YET","YEW","YID","YIN","YIP","YOB","YOD","YOK","YOM","YON","YOU","YOW","YUK","YUM","YUP","ZAG","ZAP","ZAS","ZAX","ZED","ZEE","ZEK","ZEP","ZIG","ZIN","ZIP","ZIT","ZOA","ZOO","ZUZ","ZZZ", "AAHS","AALS","ABAS","ABBA","ABBE","ABED","ABET","ABLE","ABLY","ABOS","ABRI","ABUT","ABYE","ABYS","ACED","ACES","ACHE","ACHY","ACID","ACME","ACNE","ACRE","ACTA","ACTS","ACYL","ADDS","ADIT","ADOS","ADZE","AEON","AERO","AERY","AFAR","AGAR","AGAS","AGED","AGEE","AGER","AGES","AGHA","AGIN","AGIO","AGLY","AGMA","AGOG","AGON","AGUE","AHED","AHEM","AHIS","AHOY","AIDE","AIDS","AILS","AIMS","AINS","AIRN","AIRS","AIRT","AIRY","AITS","AJAR","AJEE","AKEE","AKIN","ALAE","ALAN","ALAR","ALAS","ALBA","ALBS","ALEC","ALEE","ALEF","ALES","ALFA","ALGA","ALIF","ALIT","ALKY","ALLS","ALLY","ALMA","ALME","ALMS","ALOE","ALOW","ALPS","ALSO","ALTO","ALTS","ALUM","AMAH","AMAS","AMBO","AMEN","AMIA","AMID","AMIE","AMIN","AMIR","AMIS","AMMO","AMOK","AMPS","AMUS","AMYL","ANAL","ANAS","ANDS","ANES","ANEW","ANGA","ANIL","ANIS","ANKH","ANNA","ANOA","ANON","ANSA","ANTA","ANTE","ANTI","ANTS","ANUS","APED","APER","APES","APEX","APOD","APOS","APPS","APSE","AQUA","ARAK","ARBS","ARCH","ARCO","ARCS","AREA","ARES","ARFS","ARIA","ARID","ARIL","ARKS","ARMS","ARMY","ARSE","ARTS","ARTY","ARUM","ARVO","ARYL","ASCI","ASEA","ASHY","ASKS","ASPS","ATAP","ATES","ATMA","ATOM","ATOP","AUKS","AULD","AUNT","AURA","AUTO","AVER","AVES","AVID","AVOS","AVOW","AWAY","AWED","AWEE","AWES","AWLS","AWNS","AWNY","AWOL","AWRY","AXAL","AXED","AXEL","AXES","AXIL","AXIS","AXLE","AXON","AYAH","AYES","AYIN","AZAN","AZON","BAAL","BAAS","BABA","BABE","BABU","BABY","BACH","BACK","BADE","BADS","BAFF","BAGS","BAHT","BAIL","BAIT","BAKE","BALD","BALE","BALK","BALL","BALM","BALS","BAMS","BAND","BANE","BANG","BANI","BANK","BANS","BAPS","BARB","BARD","BARE","BARF","BARK","BARM","BARN","BARS","BASE","BASH","BASK","BASS","BAST","BATE","BATH","BATS","BATT","BAUD","BAWD","BAWL","BAYS","BEAD","BEAK","BEAM","BEAN","BEAR","BEAT","BEAU","BECK","BEDS","BEDU","BEEF","BEEN","BEEP","BEER","BEES","BEET","BEGS","BELL","BELS","BELT","BEMA","BEND","BENE","BENS","BENT","BERG","BERK","BERM","BEST","BETA","BETH","BETS","BEVY","BEYS","BHUT","BIAS","BIBB","BIBS","BICE","BIDE","BIDI","BIDS","BIER","BIFF","BIGS","BIKE","BILE","BILK","BILL","BIMA","BIND","BINE","BINS","BINT","BIOG","BIOS","BIRD","BIRK","BIRL","BIRO","BIRR","BISE","BISK","BITE","BITS","BITT","BIZE","BLAB","BLAE","BLAH","BLAM","BLAT","BLAW","BLEB","BLED","BLET","BLEW","BLIN","BLIP","BLOB","BLOC","BLOG","BLOT","BLOW","BLUB","BLUE","BLUR","BOAR","BOAS","BOAT","BOBS","BOCK","BODE","BODS","BODY","BOFF","BOGS","BOGY","BOHO","BOIL","BOLA","BOLD","BOLE","BOLL","BOLO","BOLT","BOMB","BOND","BONE","BONG","BONK","BONY","BOOB","BOOK","BOOM","BOON","BOOR","BOOS","BOOT","BOPS","BORA","BORE","BORK","BORN","BORT","BOSH","BOSK","BOSS","BOTA","BOTH","BOTS","BOTT","BOUT","BOWL","BOWS","BOXY","BOYO","BOYS","BOZO","BRAD","BRAE","BRAG","BRAN","BRAS","BRAT","BRAW","BRAY","BRED","BREE","BREN","BREW","BRIE","BRIG","BRIM","BRIN","BRIO","BRIS","BRIT","BROO","BROS","BROW","BRRR","BRUT","BRUX","BUBO","BUBS","BUBU","BUCK","BUDS","BUFF","BUGS","BUHL","BUHR","BULB","BULK","BULL","BUMF","BUMP","BUMS","BUNA","BUND","BUNG","BUNK","BUNN","BUNS","BUNT","BUOY","BURA","BURB","BURD","BURG","BURL","BURN","BURP","BURR","BURS","BURY","BUSH","BUSK","BUSS","BUST","BUSY","BUTE","BUTS","BUTT","BUYS","BUZZ","BYES","BYRE","BYRL","BYTE","CABS","CACA","CADE","CADI","CADS","CAFE","CAFF","CAGE","CAGY","CAID","CAIN","CAKE","CAKY","CALF","CALK","CALL","CALM","CALO","CALX","CAME","CAMO","CAMP","CAMS","CANE","CANS","CANT","CAPE","CAPH","CAPO","CAPS","CARB","CARD","CARE","CARK","CARL","CARN","CARP","CARR","CARS","CART","CASA","CASE","CASH","CASK","CAST","CATE","CATS","CAUL","CAVE","CAVY","CAWS","CAYS","CECA","CEDE","CEDI","CEES","CEIL","CELL","CELS","CELT","CENT","CEPE","CEPS","CERE","CERO","CESS","CETE","CHAD","CHAI","CHAM","CHAO","CHAP","CHAR","CHAT","CHAW","CHAY","CHEF","CHEW","CHEZ","CHIA","CHIC","CHID","CHIN","CHIP","CHIS","CHIT","CHON","CHOP","CHOW","CHUB","CHUG","CHUM","CIAO","CIGS","CINE","CION","CIRE","CIST","CITE","CITY","CLAD","CLAG","CLAM","CLAN","CLAP","CLAW","CLAY","CLEF","CLEW","CLIP","CLOD","CLOG","CLON","CLOP","CLOT","CLOY","CLUB","CLUE","COAL","COAT","COAX","COBB","COBS","COCA","COCK","COCO","CODA","CODE","CODS","COED","COFF","COFT","COGS","COHO","COIF","COIL","COIN","COIR","COKE","COKY","COLA","COLD","COLE","COLS","COLT","COLY","COMA","COMB","COME","COMP","CONE","CONI","CONK","CONN","CONS","CONY","COOF","COOK","COOL","COON","COOP","COOS","COOT","COPE","COPS","COPY","CORD","CORE","CORF","CORK","CORM","CORN","CORS","CORY","COSH","COSS","COST","COSY","COTE","COTS","COUP","COVE","COWL","COWS","COWY","COXA","COYS","COZY","CRAB","CRAG","CRAM","CRAP","CRAW","CRED","CREW","CRIB","CRIS","CRIT","CROC","CROP","CROW","CRUD","CRUS","CRUX","CUBE","CUBS","CUDS","CUED","CUES","CUFF","CUIF","CUKE","CULL","CULM","CULT","CUNT","CUPS","CURB","CURD","CURE","CURF","CURL","CURN","CURR","CURS","CURT","CUSK","CUSP","CUSS","CUTE","CUTS","CWMS","CYAN","CYMA","CYME","CYST","CZAR","DABS","DACE","DADA","DADO","DADS","DAFF","DAFT","DAGO","DAGS","DAHL","DAHS","DAIS","DAKS","DALE","DALS","DAME","DAMN","DAMP","DAMS","DANG","DANK","DANS","DAPS","DARB","DARE","DARK","DARN","DART","DASH","DATA","DATE","DATO","DAUB","DAUT","DAVY","DAWK","DAWN","DAWS","DAWT","DAYS","DAZE","DEAD","DEAF","DEAL","DEAN","DEAR","DEBS","DEBT","DECK","DECO","DEED","DEEM","DEEP","DEER","DEES","DEET","DEFI","DEFT","DEFY","DEIL","DEKE","DELE","DELF","DELI","DELL","DELS","DELT","DEME","DEMO","DEMY","DENE","DENI","DENS","DENT","DENY","DERE","DERM","DESK","DEVA","DEVS","DEWS","DEWY","DEXY","DEYS","DHAK","DHAL","DHOW","DIAL","DIBS","DICE","DICK","DIDO","DIDY","DIED","DIEL","DIES","DIET","DIFF","DIFS","DIGS","DIKE","DILL","DIME","DIMS","DINE","DING","DINK","DINO","DINS","DINT","DIOL","DIPS","DIPT","DIRE","DIRK","DIRL","DIRT","DISC","DISH","DISK","DISS","DITA","DITE","DITS","DITZ","DIVA","DIVE","DJIN","DOAT","DOBY","DOCK","DOCS","DODO","DOER","DOES","DOFF","DOGE","DOGS","DOGY","DOIT","DOJO","DOLE","DOLL","DOLS","DOLT","DOME","DOMS","DONA","DONE","DONG","DONS","DOOM","DOOR","DOPA","DOPE","DOPY","DORE","DORK","DORM","DORP","DORR","DORS","DORY","DOSE","DOSS","DOST","DOTE","DOTH","DOTS","DOTY","DOUM","DOUR","DOUX","DOVE","DOWN","DOWS","DOXY","DOZE","DOZY","DRAB","DRAG","DRAM","DRAT","DRAW","DRAY","DREE","DREG","DREK","DREW","DRIB","DRIP","DROP","DRUB","DRUG","DRUM","DRYS","DUAD","DUAL","DUBS","DUCE","DUCI","DUCK","DUCT","DUDE","DUDS","DUEL","DUES","DUET","DUFF","DUGS","DUIT","DUKE","DULL","DULY","DUMA","DUMB","DUMP","DUNE","DUNG","DUNK","DUNS","DUNT","DUOS","DUPE","DUPS","DURA","DURE","DURN","DURO","DURR","DUSK","DUST","DUTY","DYAD","DYED","DYER","DYES","DYKE","DYNE","EACH","EARL","EARN","EARS","EASE","EAST","EASY","EATH","EATS","EAUX","EAVE","EBBS","EBON","ECHE","ECHO","ECHT","ECRU","ECUS","EDDO","EDDY","EDGE","EDGY","EDHS","EDIT","EELS","EELY","EERY","EFFS","EFTS","EGAD","EGAL","EGER","EGGS","EGGY","EGIS","EGOS","EIDE","EKED","EKES","ELAN","ELDS","ELHI","ELKS","ELLS","ELMS","ELMY","ELSE","EMES","EMEU","EMIC","EMIR","EMIT","EMMY","EMUS","EMYD","ENDS","ENGS","ENOL","ENOW","ENUF","ENVY","EONS","EPEE","EPHA","EPIC","EPOS","ERAS","ERGO","ERGS","ERNE","ERNS","EROS","ERRS","ERST","ESES","ESNE","ESPY","ETAS","ETCH","ETHS","ETIC","ETNA","ETUI","EURO","EVEN","EVER","EVES","EVIL","EWER","EWES","EXAM","EXEC","EXED","EXES","EXIT","EXON","EXPO","EYAS","EYED","EYEN","EYER","EYES","EYNE","EYRA","EYRE","EYRY","FABS","FACE","FACT","FADE","FADO","FADS","FAGS","FAIL","FAIN","FAIR","FAKE","FALL","FALX","FAME","FANE","FANG","FANO","FANS","FARD","FARE","FARL","FARM","FARO","FART","FASH","FAST","FATE","FATS","FAUN","FAUX","FAVA","FAVE","FAWN","FAYS","FAZE","FEAL","FEAR","FEAT","FECK","FEDS","FEEB","FEED","FEEL","FEES","FEET","FEHS","FELL","FELT","FEME","FEMS","FEND","FENS","FEOD","FERE","FERN","FESS","FEST","FETA","FETE","FETS","FEUD","FEUS","FIAR","FIAT","FIBS","FICE","FICO","FIDO","FIDS","FIEF","FIFE","FIGS","FILA","FILE","FILL","FILM","FILO","FILS","FIND","FINE","FINK","FINO","FINS","FIRE","FIRM","FIRN","FIRS","FISC","FISH","FIST","FITS","FIVE","FIXT","FIZZ","FLAB","FLAG","FLAK","FLAM","FLAN","FLAP","FLAT","FLAW","FLAX","FLAY","FLEA","FLED","FLEE","FLEW","FLEX","FLEY","FLIC","FLIP","FLIR","FLIT","FLOC","FLOE","FLOG","FLOP","FLOW","FLUB","FLUE","FLUS","FLUX","FOAL","FOAM","FOBS","FOCI","FOES","FOGS","FOGY","FOHN","FOIL","FOIN","FOLD","FOLK","FOND","FONS","FONT","FOOD","FOOL","FOOT","FOPS","FORA","FORB","FORD","FORE","FORK","FORM","FORT","FOSS","FOUL","FOUR","FOWL","FOXY","FOYS","FOZY","FRAE","FRAG","FRAP","FRAT","FRAY","FREE","FRET","FRIG","FRIT","FRIZ","FROE","FROG","FROM","FROW","FRUG","FUBS","FUCI","FUCK","FUDS","FUEL","FUGS","FUGU","FUJI","FULL","FUME","FUMY","FUND","FUNK","FUNS","FURL","FURS","FURY","FUSE","FUSS","FUTZ","FUZE","FUZZ","FYCE","FYKE","GABS","GABY","GADI","GADS","GAED","GAEN","GAES","GAFF","GAGA","GAGE","GAGS","GAIN","GAIT","GALA","GALE","GALL","GALS","GAMA","GAMB","GAME","GAMP","GAMS","GAMY","GANE","GANG","GAOL","GAPE","GAPS","GAPY","GARB","GARS","GASH","GASP","GAST","GATE","GATS","GAUD","GAUM","GAUN","GAUR","GAVE","GAWK","GAWP","GAYS","GAZE","GEAR","GECK","GEDS","GEED","GEEK","GEES","GEEZ","GELD","GELS","GELT","GEMS","GENE","GENS","GENT","GENU","GERM","GEST","GETA","GETS","GEUM","GHAT","GHEE","GHIS","GIBE","GIBS","GIDS","GIED","GIEN","GIES","GIFT","GIGA","GIGS","GILD","GILL","GILT","GIMP","GINK","GINS","GIPS","GIRD","GIRL","GIRN","GIRO","GIRT","GIST","GITE","GITS","GIVE","GLAD","GLAM","GLED","GLEE","GLEG","GLEN","GLEY","GLIA","GLIB","GLIM","GLOB","GLOM","GLOP","GLOW","GLUE","GLUG","GLUM","GLUT","GNAR","GNAT","GNAW","GNUS","GOAD","GOAL","GOAS","GOAT","GOBO","GOBS","GOBY","GODS","GOER","GOES","GOGO","GOLD","GOLF","GONE","GONG","GOOD","GOOF","GOOK","GOON","GOOP","GOOS","GORE","GORM","GORP","GORY","GOSH","GOTH","GOUT","GOWD","GOWK","GOWN","GOYS","GRAB","GRAD","GRAM","GRAN","GRAT","GRAY","GREE","GREW","GREY","GRID","GRIG","GRIM","GRIN","GRIP","GRIT","GROG","GROK","GROT","GROW","GRUB","GRUE","GRUM","GUAN","GUAR","GUCK","GUDE","GUFF","GUID","GULF","GULL","GULP","GULS","GUMS","GUNK","GUNS","GURU","GUSH","GUST","GUTS","GUVS","GUYS","GYBE","GYMS","GYPS","GYRE","GYRI","GYRO","GYVE","HAAF","HAAR","HABU","HACK","HADE","HADJ","HAED","HAEM","HAEN","HAES","HAET","HAFT","HAGS","HAHA","HAHS","HAIK","HAIL","HAIR","HAJI","HAJJ","HAKE","HAKU","HALE","HALF","HALL","HALM","HALO","HALT","HAME","HAMS","HAND","HANG","HANK","HANT","HAPS","HARD","HARE","HARK","HARL","HARM","HARP","HART","HASH","HASP","HAST","HATE","HATH","HATS","HAUL","HAUT","HAVE","HAWK","HAWS","HAYS","HAZE","HAZY","HEAD","HEAL","HEAP","HEAR","HEAT","HEBE","HECK","HEED","HEEL","HEFT","HEHS","HEIL","HEIR","HELD","HELL","HELM","HELO","HELP","HEME","HEMP","HEMS","HENS","HENT","HERB","HERD","HERE","HERL","HERM","HERN","HERO","HERS","HEST","HETH","HETS","HEWN","HEWS","HICK","HIDE","HIED","HIES","HIGH","HIKE","HILA","HILI","HILL","HILT","HIMS","HIND","HINS","HINT","HIPS","HIRE","HISN","HISS","HIST","HITS","HIVE","HOAR","HOAX","HOBO","HOBS","HOCK","HODS","HOED","HOER","HOES","HOGG","HOGS","HOKE","HOLD","HOLE","HOLK","HOLM","HOLP","HOLS","HOLT","HOLY","HOME","HOMO","HOMY","HONE","HONG","HONK","HONS","HOOD","HOOF","HOOK","HOOP","HOOT","HOPE","HOPS","HORA","HORN","HOSE","HOST","HOTS","HOUR","HOVE","HOWE","HOWF","HOWK","HOWL","HOWS","HOYA","HOYS","HUBS","HUCK","HUED","HUES","HUFF","HUGE","HUGS","HUIC","HULA","HULK","HULL","HUMP","HUMS","HUNG","HUNH","HUNK","HUNS","HUNT","HURL","HURT","HUSH","HUSK","HUTS","HWAN","HYLA","HYMN","HYPE","HYPO","HYPS","HYTE","IAMB","IBEX","IBIS","ICED","ICES","ICHS","ICKY","ICON","IDEA","IDEM","IDES","IDLE","IDLY","IDOL","IDYL","IFFY","IGGS","IGLU","IKAT","IKON","ILEA","ILEX","ILIA","ILKA","ILKS","ILLS","ILLY","IMAM","IMID","IMMY","IMPI","IMPS","INBY","INCH","INFO","INIA","INKS","INKY","INLY","INNS","INRO","INTI","INTO","IONS","IOTA","IRED","IRES","IRID","IRIS","IRKS","IRON","ISBA","ISLE","ISMS","ITCH","ITEM","IWIS","IXIA","IZAR","JABS","JACK","JADE","JAGG","JAGS","JAIL","JAKE","JAMB","JAMS","JANE","JAPE","JARL","JARS","JATO","JAUK","JAUP","JAVA","JAWS","JAYS","JAZZ","JEAN","JEED","JEEP","JEER","JEES","JEEZ","JEFE","JEHU","JELL","JEON","JERK","JESS","JEST","JETE","JETS","JEUX","JEWS","JIAO","JIBB","JIBE","JIBS","JIFF","JIGS","JILL","JILT","JIMP","JINK","JINN","JINS","JINX","JISM","JIVE","JIVY","JOBS","JOCK","JOES","JOEY","JOGS","JOHN","JOIN","JOKE","JOKY","JOLE","JOLT","JOSH","JOSS","JOTA","JOTS","JOUK","JOWL","JOWS","JOYS","JUBA","JUBE","JUCO","JUDO","JUGA","JUGS","JUJU","JUKE","JUKU","JUMP","JUNK","JUPE","JURA","JURY","JUST","JUTE","JUTS","KAAS","KABS","KADI","KAES","KAFS","KAGU","KAIF","KAIL","KAIN","KAKA","KAKI","KALE","KAME","KAMI","KANA","KANE","KAON","KAPA","KAPH","KARN","KART","KATA","KATS","KAVA","KAYO","KAYS","KBAR","KEAS","KECK","KEEF","KEEK","KEEL","KEEN","KEEP","KEET","KEFS","KEGS","KEIR","KELP","KELT","KEMP","KENO","KENS","KENT","KEPI","KEPS","KEPT","KERB","KERF","KERN","KETO","KEYS","KHAF","KHAN","KHAT","KHET","KHIS","KIBE","KICK","KIDS","KIEF","KIER","KIFS","KIKE","KILL","KILN","KILO","KILT","KINA","KIND","KINE","KING","KINK","KINO","KINS","KIPS","KIRK","KIRN","KIRS","KISS","KIST","KITE","KITH","KITS","KIVA","KIWI","KLIK","KNAP","KNAR","KNEE","KNEW","KNIT","KNOB","KNOP","KNOT","KNOW","KNUR","KOAN","KOAS","KOBO","KOBS","KOEL","KOHL","KOIS","KOJI","KOLA","KOLO","KONK","KOOK","KOPH","KOPS","KORA","KORE","KORS","KOSS","KOTO","KRIS","KUDO","KUDU","KUES","KUFI","KUNA","KUNE","KURU","KVAS","KYAK","KYAR","KYAT","KYES","KYTE","LABS","LACE","LACK","LACS","LACY","LADE","LADS","LADY","LAGS","LAIC","LAID","LAIN","LAIR","LAKE","LAKH","LAKY","LALL","LAMA","LAMB","LAME","LAMP","LAMS","LAND","LANE","LANG","LANK","LAPS","LARD","LARI","LARK","LARS","LASE","LASH","LASS","LAST","LATE","LATH","LATI","LATS","LATU","LAUD","LAVA","LAVE","LAVS","LAWN","LAWS","LAYS","LAZE","LAZY","LEAD","LEAF","LEAK","LEAL","LEAN","LEAP","LEAR","LEAS","LECH","LEEK","LEER","LEES","LEET","LEFT","LEGS","LEHR","LEIS","LEKE","LEKS","LEKU","LEND","LENO","LENS","LENT","LEPT","LESS","LEST","LETS","LEUD","LEVA","LEVO","LEVY","LEWD","LEYS","LIAR","LIBS","LICE","LICH","LICK","LIDO","LIDS","LIED","LIEF","LIEN","LIER","LIES","LIEU","LIFE","LIFT","LIKE","LILO","LILT","LILY","LIMA","LIMB","LIME","LIMN","LIMO","LIMP","LIMY","LINE","LING","LINK","LINN","LINO","LINS","LINT","LINY","LION","LIPA","LIPE","LIPS","LIRA","LIRE","LIRI","LISP","LIST","LITE","LITS","LITU","LIVE","LOAD","LOAF","LOAM","LOAN","LOBE","LOBO","LOBS","LOCA","LOCH","LOCI","LOCK","LOCO","LODE","LOFT","LOGE","LOGO","LOGS","LOGY","LOID","LOIN","LOLL","LONE","LONG","LOOF","LOOK","LOOM","LOON","LOOP","LOOS","LOOT","LOPE","LOPS","LORD","LORE","LORN","LORY","LOSE","LOSS","LOST","LOTA","LOTH","LOTI","LOTS","LOUD","LOUP","LOUR","LOUT","LOVE","LOWE","LOWN","LOWS","LUAU","LUBE","LUCE","LUCK","LUDE","LUES","LUFF","LUGE","LUGS","LULL","LULU","LUMA","LUMP","LUMS","LUNA","LUNE","LUNG","LUNK","LUNT","LUNY","LURE","LURK","LUSH","LUST","LUTE","LUTZ","LUVS","LUXE","LWEI","LYCH","LYES","LYNX","LYRE","LYSE","MAAR","MABE","MACE","MACH","MACK","MACS","MADE","MADS","MAES","MAGE","MAGI","MAGS","MAID","MAIL","MAIM","MAIN","MAIR","MAKE","MAKO","MALE","MALL","MALM","MALT","MAMA","MANA","MANE","MANO","MANS","MANY","MAPS","MARA","MARC","MARE","MARK","MARL","MARS","MART","MASA","MASH","MASK","MASS","MAST","MATE","MATH","MATS","MATT","MAUD","MAUL","MAUN","MAUT","MAWN","MAWS","MAXI","MAYA","MAYO","MAYS","MAZE","MAZY","MEAD","MEAL","MEAN","MEAT","MEDS","MEED","MEEK","MEET","MEGA","MEGS","MELD","MELL","MELS","MELT","MEME","MEMO","MEMS","MEND","MENO","MENU","MEOU","MEOW","MERC","MERE","MERK","MERL","MESA","MESH","MESS","META","METE","METH","MEWL","MEWS","MEZE","MHOS","MIBS","MICA","MICE","MICK","MICS","MIDI","MIDS","MIEN","MIFF","MIGG","MIGS","MIKE","MILD","MILE","MILK","MILL","MILO","MILS","MILT","MIME","MINA","MIND","MINE","MINI","MINK","MINT","MINX","MIPS","MIRE","MIRI","MIRK","MIRS","MIRY","MISE","MISO","MISS","MIST","MITE","MITT","MITY","MIXT","MOAN","MOAS","MOAT","MOBS","MOCK","MOCS","MODE","MODI","MODS","MOGS","MOIL","MOJO","MOKE","MOLA","MOLD","MOLE","MOLL","MOLS","MOLT","MOLY","MOME","MOMI","MOMS","MONK","MONO","MONS","MONY","MOOD","MOOL","MOON","MOOR","MOOS","MOOT","MOPE","MOPS","MOPY","MORA","MORE","MORN","MORS","MORT","MOSH","MOSK","MOSS","MOST","MOTE","MOTH","MOTS","MOTT","MOUE","MOVE","MOWN","MOWS","MOXA","MOZO","MUCH","MUCK","MUDS","MUFF","MUGG","MUGS","MULE","MULL","MUMM","MUMP","MUMS","MUMU","MUNI","MUNS","MUON","MURA","MURE","MURK","MURR","MUSE","MUSH","MUSK","MUSS","MUST","MUTE","MUTS","MUTT","MYCS","MYNA","MYTH","NAAN","NABE","NABS","NADA","NAFF","NAGS","NAIF","NAIL","NALA","NAME","NANA","NANS","NAOI","NAOS","NAPA","NAPE","NAPS","NARC","NARD","NARK","NARY","NAVE","NAVY","NAYS","NAZI","NEAP","NEAR","NEAT","NEBS","NECK","NEED","NEEM","NEEP","NEGS","NEIF","NEMA","NENE","NEON","NERD","NESS","NEST","NETS","NETT","NEUK","NEUM","NEVE","NEVI","NEWS","NEWT","NEXT","NIBS","NICE","NICK","NIDE","NIDI","NIGH","NILL","NILS","NIMS","NINE","NIPA","NIPS","NISI","NITE","NITS","NIXE","NIXY","NOBS","NOCK","NODE","NODI","NODS","NOEL","NOES","NOGG","NOGS","NOIL","NOIR","NOLO","NOMA","NOME","NOMS","NONA","NONE","NOOK","NOON","NOPE","NORI","NORM","NOSE","NOSH","NOSY","NOTA","NOTE","NOUN","NOUS","NOVA","NOWS","NOWT","NUBS","NUDE","NUKE","NULL","NUMB","NUNS","NURD","NURL","NUTS","OAFS","OAKS","OAKY","OARS","OAST","OATH","OATS","OBAS","OBES","OBEY","OBIA","OBIS","OBIT","OBOE","OBOL","OCAS","ODAH","ODAS","ODDS","ODEA","ODES","ODIC","ODOR","ODYL","OFAY","OFFS","OGAM","OGEE","OGLE","OGRE","OHED","OHIA","OHMS","OILS","OILY","OINK","OKAS","OKAY","OKEH","OKES","OKRA","OLDS","OLDY","OLEA","OLEO","OLES","OLIO","OLLA","OMEN","OMER","OMIT","ONCE","ONES","ONLY","ONOS","ONTO","ONUS","ONYX","OOHS","OOPS","OOTS","OOZE","OOZY","OPAH","OPAL","OPED","OPEN","OPES","OPTS","OPUS","ORAD","ORAL","ORBS","ORBY","ORCA","ORCS","ORDO","ORES","ORGY","ORLE","ORRA","ORTS","ORYX","ORZO","OSAR","OSES","OSSA","OTIC","OTTO","OUCH","OUDS","OUPH","OURS","OUST","OUTS","OUZO","OVAL","OVEN","OVER","OVUM","OWED","OWES","OWLS","OWNS","OWSE","OXEN","OXES","OXID","OXIM","OYER","OYES","OYEZ","PACA","PACE","PACK","PACS","PACT","PACY","PADI","PADS","PAGE","PAID","PAIK","PAIL","PAIN","PAIR","PALE","PALL","PALM","PALP","PALS","PALY","PAMS","PANE","PANG","PANS","PANT","PAPA","PAPS","PARA","PARD","PARE","PARK","PARR","PARS","PART","PASE","PASH","PASS","PAST","PATE","PATH","PATS","PATY","PAVE","PAWL","PAWN","PAWS","PAYS","PEAG","PEAK","PEAL","PEAN","PEAR","PEAS","PEAT","PECH","PECK","PECS","PEDS","PEED","PEEK","PEEL","PEEN","PEEP","PEER","PEES","PEGS","PEHS","PEIN","PEKE","PELE","PELF","PELT","PEND","PENS","PENT","PEON","PEPO","PEPS","PERE","PERI","PERK","PERM","PERP","PERT","PERV","PESO","PEST","PETS","PEWS","PFFT","PFUI","PHAT","PHEW","PHIS","PHIZ","PHON","PHOT","PHUT","PIAL","PIAN","PIAS","PICA","PICE","PICK","PICS","PIED","PIER","PIES","PIGS","PIKA","PIKE","PIKI","PILE","PILI","PILL","PILY","PIMA","PIMP","PINA","PINE","PING","PINK","PINS","PINT","PINY","PION","PIPE","PIPS","PIPY","PIRN","PISH","PISO","PISS","PITA","PITH","PITS","PITY","PIXY","PLAN","PLAT","PLAY","PLEA","PLEB","PLED","PLEW","PLEX","PLIE","PLOD","PLOP","PLOT","PLOW","PLOY","PLUG","PLUM","PLUS","POCK","POCO","PODS","POEM","POET","POGY","POIS","POKE","POKY","POLE","POLL","POLO","POLS","POLY","POME","POMO","POMP","POMS","POND","PONE","PONG","PONS","PONY","POOD","POOF","POOH","POOL","POON","POOP","POOR","POOS","POPE","POPS","PORE","PORK","PORN","PORT","POSE","POSH","POST","POSY","POTS","POUF","POUR","POUT","POWS","POXY","PRAM","PRAO","PRAT","PRAU","PRAY","PREE","PREP","PREX","PREY","PREZ","PRIG","PRIM","PROA","PROD","PROF","PROG","PROM","PROP","PROS","PROW","PSIS","PSST","PTUI","PUBS","PUCE","PUCK","PUDS","PUFF","PUGH","PUGS","PUJA","PUKE","PULA","PULE","PULI","PULL","PULP","PULS","PUMA","PUMP","PUNA","PUNG","PUNK","PUNS","PUNT","PUNY","PUPA","PUPS","PUPU","PURE","PURI","PURL","PURR","PURS","PUSH","PUSS","PUTS","PUTT","PUTZ","PYAS","PYES","PYIC","PYIN","PYRE","PYRO","QADI","QAID","QATS","QOPH","QUAD","QUAG","QUAI","QUAY","QUEY","QUID","QUIN","QUIP","QUIT","QUIZ","QUOD","RACE","RACK","RACY","RADS","RAFF","RAFT","RAGA","RAGE","RAGG","RAGI","RAGS","RAIA","RAID","RAIL","RAIN","RAIS","RAJA","RAKE","RAKI","RAKU","RALE","RAMI","RAMP","RAMS","RAND","RANG","RANI","RANK","RANT","RAPE","RAPS","RAPT","RARE","RASE","RASH","RASP","RATE","RATH","RATO","RATS","RAVE","RAWS","RAYA","RAYS","RAZE","RAZZ","READ","REAL","REAM","REAP","REAR","REBS","RECK","RECS","REDD","REDE","REDO","REDS","REED","REEF","REEK","REEL","REES","REFS","REFT","REGS","REIF","REIN","REIS","RELY","REMS","REND","RENT","REPO","REPP","REPS","RESH","REST","RETE","RETS","REVS","RHEA","RHOS","RHUS","RIAL","RIAS","RIBS","RICE","RICH","RICK","RIDE","RIDS","RIEL","RIFE","RIFF","RIFS","RIFT","RIGS","RILE","RILL","RIME","RIMS","RIMY","RIND","RING","RINK","RINS","RIOT","RIPE","RIPS","RISE","RISK","RITE","RITZ","RIVE","ROAD","ROAM","ROAN","ROAR","ROBE","ROBS","ROCK","ROCS","RODE","RODS","ROES","ROIL","ROLE","ROLF","ROLL","ROMP","ROMS","ROOD","ROOF","ROOK","ROOM","ROOT","ROPE","ROPY","ROSE","ROSY","ROTA","ROTE","ROTI","ROTL","ROTO","ROTS","ROUE","ROUP","ROUT","ROUX","ROVE","ROWS","RUBE","RUBS","RUBY","RUCK","RUDD","RUDE","RUED","RUER","RUES","RUFF","RUGA","RUGS","RUIN","RULE","RULY","RUMP","RUMS","RUNE","RUNG","RUNS","RUNT","RUSE","RUSH","RUSK","RUST","RUTH","RUTS","RYAS","RYES","RYKE","RYND","RYOT","SABE","SABS","SACK","SACS","SADE","SADI","SAFE","SAGA","SAGE","SAGO","SAGS","SAGY","SAID","SAIL","SAIN","SAKE","SAKI","SALE","SALL","SALP","SALS","SALT","SAME","SAMP","SAND","SANE","SANG","SANK","SANS","SAPS","SARD","SARI","SARK","SASH","SASS","SATE","SATI","SAUL","SAVE","SAWN","SAWS","SAYS","SCAB","SCAD","SCAG","SCAM","SCAN","SCAR","SCAT","SCOP","SCOT","SCOW","SCRY","SCUD","SCUM","SCUP","SCUT","SEAL","SEAM","SEAR","SEAS","SEAT","SECS","SECT","SEED","SEEK","SEEL","SEEM","SEEN","SEEP","SEER","SEES","SEGO","SEGS","SEIF","SEIS","SELF","SELL","SELS","SEME","SEMI","SEND","SENE","SENT","SEPT","SERA","SERE","SERF","SERS","SETA","SETS","SETT","SEWN","SEWS","SEXT","SEXY","SHAD","SHAG","SHAH","SHAM","SHAT","SHAW","SHAY","SHEA","SHED","SHES","SHEW","SHIM","SHIN","SHIP","SHIT","SHIV","SHMO","SHOD","SHOE","SHOG","SHOO","SHOP","SHOT","SHOW","SHRI","SHUL","SHUN","SHUT","SHWA","SIAL","SIBB","SIBS","SICE","SICK","SICS","SIDE","SIDH","SIFT","SIGH","SIGN","SIKA","SIKE","SILD","SILK","SILL","SILO","SILT","SIMA","SIMP","SIMS","SINE","SING","SINH","SINK","SINS","SIPE","SIPS","SIRE","SIRS","SITE","SITH","SITS","SIZE","SIZY","SKAG","SKAS","SKAT","SKEE","SKEG","SKEP","SKEW","SKID","SKIM","SKIN","SKIP","SKIS","SKIT","SKUA","SLAB","SLAG","SLAM","SLAP","SLAT","SLAW","SLAY","SLED","SLEW","SLID","SLIM","SLIP","SLIT","SLOB","SLOE","SLOG","SLOP","SLOT","SLOW","SLUB","SLUE","SLUG","SLUM","SLUR","SLUT","SMEW","SMIT","SMOG","SMUG","SMUT","SNAG","SNAP","SNAW","SNED","SNIB","SNIP","SNIT","SNOB","SNOG","SNOT","SNOW","SNUB","SNUG","SNYE","SOAK","SOAP","SOAR","SOBA","SOBS","SOCA","SOCK","SODA","SODS","SOFA","SOFT","SOIL","SOJA","SOKE","SOLA","SOLD","SOLE","SOLI","SOLO","SOLS","SOMA","SOME","SOMS","SONE","SONG","SONS","SOOK","SOON","SOOT","SOPH","SOPS","SORA","SORB","SORD","SORE","SORI","SORN","SORT","SOTH","SOTS","SOUK","SOUL","SOUP","SOUR","SOUS","SOWN","SOWS","SOYA","SOYS","SPAE","SPAM","SPAN","SPAR","SPAS","SPAT","SPAY","SPAZ","SPEC","SPED","SPEW","SPIC","SPIK","SPIN","SPIT","SPIV","SPOT","SPRY","SPUD","SPUE","SPUN","SPUR","SRIS","STAB","STAG","STAR","STAT","STAW","STAY","STEM","STEP","STET","STEW","STEY","STIR","STOA","STOB","STOP","STOT","STOW","STUB","STUD","STUM","STUN","STYE","SUBA","SUBS","SUCH","SUCK","SUDD","SUDS","SUED","SUER","SUES","SUET","SUGH","SUIT","SUKS","SULK","SULU","SUMO","SUMP","SUMS","SUNG","SUNK","SUNN","SUNS","SUPE","SUPS","SUQS","SURA","SURD","SURE","SURF","SUSS","SWAB","SWAG","SWAM","SWAN","SWAP","SWAT","SWAY","SWIG","SWIM","SWOB","SWOP","SWOT","SWUM","SYBO","SYCE","SYKE","SYLI","SYNC","SYNE","SYPH","TABS","TABU","TACE","TACH","TACK","TACO","TACT","TADS","TAEL","TAGS","TAHR","TAIL","TAIN","TAKA","TAKE","TALA","TALC","TALE","TALI","TALK","TALL","TAME","TAMP","TAMS","TANG","TANK","TANS","TAOS","TAPA","TAPE","TAPS","TARE","TARN","TARO","TARP","TARS","TART","TASK","TASS","TATE","TATS","TAUS","TAUT","TAVS","TAWS","TAXA","TAXI","TEAK","TEAL","TEAM","TEAR","TEAS","TEAT","TECH","TEDS","TEED","TEEL","TEEM","TEEN","TEES","TEFF","TEGG","TEGS","TELA","TELE","TELL","TELS","TEMP","TEND","TENS","TENT","TEPA","TERM","TERN","TEST","TETH","TETS","TEWS","TEXT","THAE","THAN","THAT","THAW","THEE","THEM","THEN","THEW","THEY","THIN","THIO","THIR","THIS","THOU","THRO","THRU","THUD","THUG","THUS","TICK","TICS","TIDE","TIDY","TIED","TIER","TIES","TIFF","TIKE","TIKI","TILE","TILL","TILS","TILT","TIME","TINE","TING","TINS","TINT","TINY","TIPI","TIPS","TIRE","TIRL","TIRO","TITI","TITS","TIVY","TOAD","TOBY","TODS","TODY","TOEA","TOED","TOES","TOFF","TOFT","TOFU","TOGA","TOGS","TOIL","TOIT","TOKE","TOLA","TOLD","TOLE","TOLL","TOLU","TOMB","TOME","TOMS","TONE","TONG","TONS","TONY","TOOK","TOOL","TOOM","TOON","TOOT","TOPE","TOPH","TOPI","TOPO","TOPS","TORA","TORC","TORE","TORI","TORN","TORO","TORR","TORS","TORT","TORY","TOSH","TOSS","TOST","TOTE","TOTS","TOUR","TOUT","TOWN","TOWS","TOWY","TOYO","TOYS","TRAD","TRAM","TRAP","TRAY","TREE","TREF","TREK","TRES","TRET","TREY","TRIG","TRIM","TRIO","TRIP","TROD","TROG","TROP","TROT","TROW","TROY","TRUE","TRUG","TSAR","TSKS","TUBA","TUBE","TUBS","TUCK","TUFA","TUFF","TUFT","TUGS","TUIS","TULE","TUMP","TUNA","TUNE","TUNG","TUNS","TUPS","TURD","TURF","TURK","TURN","TUSH","TUSK","TUTS","TUTU","TWAE","TWAS","TWAT","TWEE","TWIG","TWIN","TWIT","TWOS","TYEE","TYER","TYES","TYIN","TYKE","TYNE","TYPE","TYPO","TYPP","TYPY","TYRE","TYRO","TZAR","UDON","UDOS","UGHS","UGLY","UKES","ULAN","ULNA","ULUS","ULVA","UMBO","UMPS","UNAI","UNAU","UNBE","UNCI","UNCO","UNDE","UNDO","UNDY","UNIT","UNTO","UPAS","UPBY","UPDO","UPON","URBS","URDS","UREA","URGE","URIC","URNS","URPS","URSA","URUS","USED","USER","USES","UTAS","UTES","UVEA","VACS","VAGI","VAIL","VAIN","VAIR","VALE","VAMP","VANE","VANG","VANS","VARA","VARS","VARY","VASA","VASE","VAST","VATS","VATU","VAUS","VAVS","VAWS","VEAL","VEEP","VEER","VEES","VEIL","VEIN","VELA","VELD","VENA","VEND","VENT","VERA","VERB","VERT","VERY","VEST","VETO","VETS","VEXT","VIAL","VIBE","VICE","VIDE","VIDS","VIED","VIER","VIES","VIEW","VIGA","VIGS","VILE","VILL","VIMS","VINA","VINE","VINO","VINY","VIOL","VIRL","VISA","VISE","VITA","VIVA","VIVE","VOES","VOID","VOLE","VOLT","VOTE","VOWS","VROW","VUGG","VUGH","VUGS","WABS","WACK","WADE","WADI","WADS","WADY","WAES","WAFF","WAFT","WAGE","WAGS","WAIF","WAIL","WAIN","WAIR","WAIT","WAKE","WALE","WALK","WALL","WALY","WAME","WAND","WANE","WANK","WANS","WANT","WANY","WAPS","WARD","WARE","WARK","WARM","WARN","WARP","WARS","WART","WARY","WASH","WASP","WAST","WATS","WATT","WAUK","WAUL","WAUR","WAVE","WAVY","WAWL","WAWS","WAXY","WAYS","WEAK","WEAL","WEAN","WEAR","WEBS","WEDS","WEED","WEEK","WEEL","WEEN","WEEP","WEER","WEES","WEET","WEFT","WEIR","WEKA","WELD","WELL","WELT","WEND","WENS","WENT","WEPT","WERE","WERT","WEST","WETS","WHAM","WHAP","WHAT","WHEE","WHEN","WHET","WHEW","WHEY","WHID","WHIG","WHIM","WHIN","WHIP","WHIR","WHIT","WHIZ","WHOA","WHOM","WHOP","WHUP","WHYS","WICH","WICK","WIDE","WIFE","WIGS","WILD","WILE","WILL","WILT","WILY","WIMP","WIND","WINE","WING","WINK","WINO","WINS","WINY","WIPE","WIRE","WIRY","WISE","WISH","WISP","WISS","WIST","WITE","WITH","WITS","WIVE","WOAD","WOES","WOGS","WOKE","WOKS","WOLD","WOLF","WOMB","WONK","WONS","WONT","WOOD","WOOF","WOOL","WOOS","WOPS","WORD","WORE","WORK","WORM","WORN","WORT","WOST","WOTS","WOVE","WOWS","WRAP","WREN","WRIT","WUSS","WYCH","WYES","WYLE","WYND","WYNN","WYNS","WYTE","XYST","YACK","YAFF","YAGI","YAGS","YAKS","YALD","YAMS","YANG","YANK","YAPS","YARD","YARE","YARN","YAUD","YAUP","YAWL","YAWN","YAWP","YAWS","YAYS","YEAH","YEAN","YEAR","YEAS","YECH","YEGG","YELD","YELK","YELL","YELP","YENS","YEPS","YERK","YETI","YETT","YEUK","YEWS","YIDS","YILL","YINS","YIPE","YIPS","YIRD","YIRR","YLEM","YOBS","YOCK","YODH","YODS","YOGA","YOGH","YOGI","YOKE","YOKS","YOLK","YOND","YONI","YORE","YOUR","YOUS","YOWE","YOWL","YOWS","YUAN","YUCA","YUCH","YUCK","YUGA","YUKS","YULE","YUPS","YURT","YUTZ","YWIS","ZAGS","ZANY","ZAPS","ZARF","ZEAL","ZEBU","ZEDS","ZEES","ZEIN","ZEKS","ZEPS","ZERK","ZERO","ZEST","ZETA","ZIGS","ZILL","ZINC","ZINE","ZING","ZINS","ZIPS","ZITI","ZITS","ZOEA","ZOIC","ZONA","ZONE","ZONK","ZOOM","ZOON","ZOOS","ZORI","ZOUK","ZYME"]
    this.checkWord = function (word) {
      for (var i = 0; i < this.words.length; i++) {
        if (this.words[i] === word) {
          return true;
        }
      }
      return false;
    };

    //an important function for the matrix: works as both GET and SET for letters, depending on whether a third argument is passed
    this.letter = function (x, y, value) {
      if (value !== undefined) {
        this.matrix[y][x].letter = value;
      } else if (x < this.width && x > -1 && y < this.height && y > -1) {
        return this.matrix[y][x].letter;
      } else {
        return 0;
      }
    };

    //these four functions take in the output of the 'grab' functions below, using the data to properly alter the two ancillary matrices (redLetterMatrix and blueLetterMatrix)

    this.deactivateCol = function (word) {
      for (var i = 1; i < word.length; i++) {
        var x = word[i][0], y = word[i][1];
        if (x < this.width && x > -1 && y < this.height && y > -1) {
          this.matrix[y][x].col = 0;
        }
      }
    };
    this.activateCol = function (word) {
      for (var i = 1; i < word.length; i++) {
        var x = word[i][0], y = word[i][1];
        if (x < this.width && x > -1 && y < this.height && y > -1) {
          this.matrix[y][x].col = 1;
        }
      }
    };

    this.deactivateRow = function (word) {
      for (var i = 1; i < word.length; i++) {
        var x = word[i][0], y = word[i][1];
        if (x < this.width && x > -1 && y < this.height && y > -1) {
          this.matrix[y][x].row = 0;
        }
      }
    };

    this.activateRow = function (word) {
      for (var i = 1; i < word.length; i++) {
      var x = word[i][0], y = word[i][1];
      if (x < this.width && x > -1 && y < this.height && y > -1) {
        this.matrix[y][x].row = 1;
      }
      }
    }


    //takes in the coordinates of a piece, and checks the scrabble-validity of both the row- and column- word of which it is a part, and colors them accordingly.
    this.colorWord = function (x, y) {
      var rowWord = this.grabRowWord(x, y);
      var colWord = this.grabColWord(x, y);
      if (rowWord) {
        if (this.checkWord(rowWord[0])) {
          this.activateRow(rowWord);
        } else {
          this.deactivateRow(rowWord);
        }
      }
      if (colWord) {
        if (this.checkWord(colWord[0])) {
          this.activateCol(colWord);
        } else {
          this.deactivateCol(colWord);
        }
      }
    };


    //first while loop moves to the first letter in the potential word in which the letter (x, y) sits
    //second while loop iterates from the first letter to last, building the letters into a string, which is placed as the first element in the returned array.
    //the other elements of the array are tuples of the position of each letter in the potential word (this can be done more efficiently)
    this.grabRowWord = function (x, y) {
      if (this.letter(x, y) === 0) {
        return;
      }
      var atFirstLetter = this.letter(x-1, y) === 0 ? true : false;
      while (atFirstLetter === false) {
        x--;
        atFirstLetter = this.letter(x-1, y) === 0 ? true : false;
      }
      var string = this.letter(x, y);
      var result = [string, [x, y]];
      var atLastLetter = this.letter(x+1, y) === 0 ? true : false;
      while (atLastLetter === false) {
        x++;
        result[0] += this.letter(x, y);
        result.push([x, y]);
        atLastLetter = this.letter(x+1, y) === 0 ? true : false;
      }
      return result;
    };
    this.grabColWord = function(x, y) {
      if (this.letter(x, y) === 0) {
        return;
      }
      var atFirstLetter = this.letter(x, y-1) === 0 ? true : false;
      while (atFirstLetter === false) {
        y--;
        atFirstLetter = this.letter(x, y-1) === 0 ? true : false;
      }
      var string = this.letter(x, y);
      var result = [string, [x, y]];
      var atLastLetter = this.letter(x, y+1) === 0 ? true : false;
      while (atLastLetter === false) {
        y++;
        result[0] += this.letter(x, y);
        result.push([x, y]);
        atLastLetter = this.letter(x, y+1) === 0 ? true : false;
      }
      return result;
    };


    this.makeEmptyMatrix = function (width, height) {
      var i, j, matrix = [];
      for (i = 0; i < height; i++) {
        var row = [];
        for (j = 0; j < width; j++) {
          row.push({letter: 0, row: 0, col: 0});
        }
        matrix.push(row);
      }
      return matrix;
    }

    this.makeBigger = function (type) {
      if (type === 'top') {
        for (var y = this.height -1; y >=0; y--) {
          for (var x = 0; x < this.width; x++) {
            if (this.letter(x, y) !== 0) {
              this.matrix[y+1][x] = this.matrix[y][x];
              this.matrix[y][x] = {letter: 0, row: 0, col: 0};
            }
          }
        }
      } else if (type === 'bottom') {
         for (var y = 0; y <= this.height; y++) {
          for (var x = 0; x < this.width; x++) {
            if (this.letter(x, y) !== 0) {
              this.matrix[y-1][x] = this.matrix[y][x];
              this.matrix[y][x] = {letter: 0, row: 0, col: 0};
            }
          }
        }
      } else if (type === 'left') {
        for (var y = this.height -1; y >= 0; y--) {
          for (var x = this.width -1; x >= 0; x--) {
            if (this.letter(x, y) !== 0) {
              this.matrix[y][x+1] = this.matrix[y][x];
              this.matrix[y][x] = {letter: 0, row: 0, col: 0};
            }
          }
        }
      } else if (type === 'right') {
        for (var y = this.height -1; y >= 0; y--) {
          for (var x = 0; x < this.width; x++) {
            if (this.letter(x, y) !== 0) {
              this.matrix[y][x-1] = this.matrix[y][x];
              this.matrix[y][x] = {letter: 0, row: 0, col: 0};
            }
          }
        }
      }
    }

    this.frequency = ["A","A","A","A","A","A","A","A","A","B","B","C","C","D","D","D","D","E","E","E","E","E","E","E","E","E","E","E","E","F","F","G","G","G","H","H","I","I","I","I","I","I","I","I","I","J","K","L","L","L","L","M","M","N","N","N","N","N","N","O","O","O","O","O","O","O","O","P","P","Q","R","R","R","R","R","R","S","S","S","S","T","T","T","T","T","T","U","U","U","U","V","V","W","W","X","Y","Y","Z"];
    this.randomLetter = function () {
      return this.frequency[Math.floor(Math.random() * this.frequency.length)];
    };

    this.matrix = this.makeEmptyMatrix(this.width, this.height);
    
    for (var i = 0; i < 3; i++) {
      this.letter(6 + i * 2, 4, this.randomLetter());
    }

    for (i = 0; i < 4; i++) {
      this.letter(5 + i * 2, 5, this.randomLetter());
    }
    
  } // end of initialize

});