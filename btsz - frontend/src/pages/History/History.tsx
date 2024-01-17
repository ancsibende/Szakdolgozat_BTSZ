import React from "react";
import styles from "./History.module.scss";
import LL from "../../translations";
import teke1 from "../../assets/pictures/teke1.png";
import teke2 from "../../assets/pictures/teke2.png";
import diff from "../../assets/pictures/differencies.png";
import vorosmarty from "../../assets/pictures/vorosmarty.jpg";
import czuczor from "../../assets/pictures/czuczor.jpg";
import csatt from "../../assets/pictures/CSATT.png";
import babuallas from "../../assets/pictures/babuallas.jpg";

const Story = () => {
  return (
    <div className={styles.container}>
      <div className={styles.subtitle}>{LL.history}</div>
      <div className={styles.content}>
        <p>
          A tekéhez hasonló játék már az ókori Egyiptomban is létezett. A
          legkorábbi leletet 7 000 éve egy piramis maradványai között találták.
        </p>
        <p>
          Az ókori görögök is ismerték a játékot, de elõfordult ez az elnevezés
          a pogány germánok egyik kõdobó játékaként is.
        </p>
        <p>
          A kereskedõk utazgatásai során a játék egyre népszerûbb lett, s már
          <strong> Julius Caesar</strong> (Kr. e. 100. július 13. - Kr. e. 44.
          március 15.) korában eljutott a kikapcsolódás ezen formája Babilonba,
          onnan pedig Itáliába. Õk egy kicsit módosítottak a játékon, s ebbõl
          lett késõbb a
          <strong>
            <em> bocsa</em>
          </strong>
          . Ez csak annyiban különbözik a tekétõl, hogy egy körülbelül 17 - 29
          méterre lévõ kis sárga golyóhoz kell gurítani minél közelebb a
          golyókat. A két játékosnak erre 5 golyója van.
        </p>
        <p>
          Késõbb az Északi országokban (Svédország, Norvégia, Anglia, Kanada,
          Svájc) kialakul jeges változata a
          <strong>
            <em> curling</em>
          </strong>
          .
        </p>
        <p>
          A
          <strong>
            <em> bowling </em>
          </strong>
          mai értelemben vett formáját elõször egy Londonról szóló könyvben
          említették kb 800 éve. Eszerint a sportág szabadtéri játék volt,
          melyet elsõsorban a nemesek játszottak. Az elsõ fedett pályás helyrõl
          szóló írás 1445-bõl származik szintén Londonból. Más elmélet szerint a
          modern játék Németalföldön alakult ki idõszámítás szerint 300 körül. A
          hollandok verziójában - amelyben a kilenc bábut gyémánt alakban
          állították fel - az volt a cél, hogy csak a középsõ bábut találják el.
          Amerikába az elsõ holland bevándorlókkal került a játék. Itt a szesz~
          és szerencsejáték tilalom idején, - hogy a betiltását elkerüljék - a
          kilenc bábuhoz tettek egy 10.-et és a felállítást is háromszög alakra
          változtatták.
        </p>
        <h3>A “kistestvér”, a bowling rövid története</h3>
        <p>
          Ahogy az 1800-as évek uralkodó sportjává vált Amerikában, úgy vált
          szükségessé a szabályok~, a pálya~, a bábu~ és a golyóméretek
          egységesítése is. 1875-ben megalakult a Nemzeti Bowling Szövetség,
          melyet 1895. szeptember 8.-án az
          <strong> Amerikai Bowling Kongresszus </strong>
          (ABC) követett. 1901-ben az ABC Chicagoban rendezte meg elsõ menzeti
          tornáját, mely hatalmas sikert aratott. Az ABC-t gyorsan a hírnév és
          elismerés felé repítette olyannyira, hogy az egész világon elterjedt.
        </p>
        <p>
          1958-ban Eddie Elias a világ legjobb 17 játékosával magalapította a
          <strong> Profi Bowlingozók Szervezetét </strong>(PBA), mely a mai
          napig fennáll. A nemzeti televízió állomással megegyezve Amerikában
          szintén Õ hozta be a játékot az emberek otthonába is.
        </p>
        <div className={styles.imgContainer}>
          <img src={teke1} />
          <img src={teke2} />
        </div>
        <p>
          A sportág folyamatos változásokon, fejlesztéseken és finomításokon
          ment keresztül. A legnagyobb technikai elõrelépés az AMF által
          1950-ben kiadott automata bábuállító volt, amely lesöpörte a pályákról
          a Brunswick félautomata és teljesen manuális gépeit. Ezekkel a
          változásokkal felkeltette az emberek érdeklõdését, s ezáltal a 10
          bábus bowling Amerika legkedveltebb idõtöltésévé vált.
        </p>
        <p>
          Angliába 1960-ban “tért vissza” a játék - már az új, 10 bábus
          változatban. Az 1990-es évek közepétõl hazánkban is számos
          bowling-centerben jelent meg a “galaktikus bowling”, ahol a sötétben
          csak a bábuk világítanak és számtalan fény~ és hangeffektus teszi
          érdekessé a játékot.
        </p>
        <img className={styles.img} src={diff} />
        <h3>Alapvetõ különbségek</h3>
        <h4>(a szakszavak a mûszaki résznél pontosítva)</h4>
        <div>
          <table>
            <thead>
              <tr>
                <th style={{ width: "40%" }} />
                <th>
                  <strong>
                    <em>bowling</em>
                  </strong>
                </th>
                <th>
                  <strong>
                    <em>teke</em>
                  </strong>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>a játéktér, a bábuállás anyaga</td>
                <td>egyforma</td>
                <td>2-3 féle</td>
              </tr>
              <tr>
                <td>a játéktér olajozása</td>
                <td>2 féle</td>
                <td>nincs</td>
              </tr>
              <tr>
                <td>a játékostér anyaga</td>
                <td>egyféle</td>
                <td>kétféle</td>
              </tr>
              <tr>
                <td>a játék</td>
                <td>szakaszos</td>
                <td>folyamatos</td>
              </tr>
              <tr>
                <td>a bábuk felálításának alakja</td>
                <td>háromszög</td>
                <td>rombusz</td>
              </tr>
              <tr>
                <td>a bábukon zsinór</td>
                <td>általában nincs</td>
                <td>mindig van</td>
              </tr>
              <tr>
                <td>bábugarnitúra</td>
                <td>kettő</td>
                <td>egy</td>
              </tr>
              <tr>
                <td>saját golyó használata</td>
                <td>engedélyezett</td>
                <td>tilos</td>
              </tr>
              <tr>
                <td>a golyó tömege</td>
                <td>különböző</td>
                <td>egyforma</td>
              </tr>
              <tr>
                <td>a golyót bedobni a játéktérre</td>
                <td>kötelező</td>
                <td>tilos</td>
              </tr>
              <tr>
                <td>a golyó útja a bábukig</td>
                <td>ívelt</td>
                <td>egyenes</td>
              </tr>
              <tr>
                <td>sportfelszerelés (mez, nadrág, cipő)</td>
                <td>csak cipő</td>
                <td>mind kötelező</td>
              </tr>
            </tbody>
          </table>

          <p className={styles.label}>A játékos</p>
          <table>
            <tbody>
              <tr>
                <td style={{ width: "40%" }}>
                  játék közben elhagyhatja a játékteret
                </td>
                <td style={{ width: "30%" }}>igen</td>
                <td>nem</td>
              </tr>
              <tr>
                <td>leülhet</td>
                <td>igen</td>
                <td>nem</td>
              </tr>
              <tr>
                <td>a játék ideje</td>
                <td>a 10. sorozat végéig tart</td>
                <td>időre</td>
              </tr>
            </tbody>
          </table>
          <p>
            A bowling nem más, mint a Klasszikus teke 2-es tarolása, csak a
            számolása más. Bowlingban a világrekord 300 fa, amit számos ember
            elért már - többek között két magyar játékos is.
          </p>
          <p>
            A tekében 1 080 fa (120 vegyes estén) lenne a világcsúcs, ezt
            azonban még senki sem érte el. Jelenleg (2009 óta) 734 fa a
            világcsúcs. Ezt már a magyar <strong>Kiss Tamás</strong> (KK
            Neumarkt - ITA) is túlszárnyalta.
          </p>
          <h3>Budapesti versenyteke kialakulása és eredményei</h3>
          <p>
            A tatárjárás (1241 - 1242)után az elnéptelenedett oszágba a Béla
            király által Erdélybe telepített szászok építettek pályákat a
            parajdi sóbányákból termelt tükörsima sólemezek mozaikszerû
            összerakásával. Nagyszebenben a Kül~, késõbb a Hártenek utcában
            megépülnek az elsõ tekepályák, mint különálló “Kigelraum”. Ekkor még
            a két szélsõ (4-es és 6-os) bábuk nélkül
            <strong> 7 fára, 3x3 dobásos </strong>
            tarolásból állt a verseny. Ekkor a szabályok még nem voltak papírra
            vetve, ezért a játékosok kézzel-lábbal irányítani próbálták
            befolyásolni a golyó útját, a vereséget pedig nehezen viselték el. A
            játék kedvelõi a nép soraiból kerültek ki. Csak szabadban
            játszották: vásárok, búcsúk, lövészegyleti ünnepségek alkalmával.
          </p>
          <p>
            A XIV. században egyre többen építettek kezdetleges “kuglipályát” -
            a német kugel szóból, ami gömböt, golyót jelent -. Így hívták azt a
            kõgolyót, amelyet harci eszközként használva az ellenségre
            gurítottak ostrom közben a vár faláról. Kellõ felkészültséget,
            figyelmet, testi erõt kívánt az ezt játszó lovagoktól, harcosoktól.
          </p>
          <p>
            Mátyás király (1458 - 1490) udvarában szintén kedvelt játék volt,
            noha csak egyes elemeiben hasonlított a mai tekéhez. Nem lett volna
            a játék izgalmas, ha nem lett volna tétje: a gyõztes
            diadalmaskodott, a vesztes szomorkodott. Néha a civakodástól sem
            riadtak vissza. A jutalom piros kendõ, vagy pénz volt. Azonban
            <strong> ekkor sem tûrték meg a sportszerûtlen viselkedést </strong>
            , ezért egyes helyeken vagy betiltották a tekézést, vagy megszabták
            a pénzdíjak felsõ határát.
          </p>
          <p>
            A golyót eleinte kemény földön gurították, késõbb agyagréteggel
            vonták be a pályát. Egyenetlenségeit többféle módon próbálták jobbá
            tenni. Különváltozatait ismerték Angliában, Németalföldön, illetve a
            német nyelvterületen
          </p>
          <p>
            Az 1800-as években találkozunk a teke Erdélyi bölcsõjében -
            Nagyszebenben - a “döngölt” pályákkal. Itt Fleischer Michel - a
            takács cég “atyamestere” és betûvetõ - a Kigelbaum und kigelräume
            címû szásznyelvû brossúrája leírja, hogy 1817-ben a várostáblán
            arany betûkkel kiírt Kigelmaister (Tekemester) az évben a legtöbbet
            ütõ Joan Konnert volt a Bayergassai Grosshause-ból. Ez a remek sport
            valóban sportszellemben terjedt el Erdélyben és csak az 1800-as évek
            végén ugyancsak Nagyszebenben találkozunk az elsõ tekepályával,
            melyet Fleischer Michel egyik késõi “elfajult” ivadéka Gasthause-zal
            kötött össze. Így lett a tekepálya vendéglõi függelékké.
          </p>
          <div className={styles.imgContainer}>
            <p className={styles.quote}>
              “Százezrek fogják kapuidat döngetni tekékkel” - írta késõbb
              Vörösmarty Mihály (1800 - 1855)
            </p>
            <img
              className={styles.img}
              style={{ maxWidth: "350px" }}
              src={vorosmarty}
            />
          </div>

          <div className={styles.imgContainer}>
            <img
              className={styles.img}
              style={{ maxWidth: "350px" }}
              src={czuczor}
            />
            <p className={styles.quote}>
              “Ádáz Ali tábora durrog alatt, s rombolja tekékkel a sziklafalat”
              - írta Czucszor Gergely (1800 - 1866)
            </p>
          </div>
          <p>
            A XIX. században a dobótér helyére idõvel tölgyfa palló került. A
            nagy érdeklõdésre és a nagyobb kihasználhatóságra tekintet- tel
            befedték a pályákat. A szabadból a “házon belülre” - pincékbe vagy
            külön termekben létesültek pályák. Az építõipar figyelmét is
            felkeltette a belsõ hasznosítás, ezért aszfaltból, márványból,
            cementbõl, vasból építettek pályákat.
          </p>
          <p>
            <strong>1885. június 7.-én Drezdában </strong>alakították meg a
            német teke-egyesületek központi szövetségét. 227 tagegyesület
            csatlakozott a szervezethez
          </p>
          <div className={styles.imgContainer}>
            <img src={csatt} alt="" />
          </div>
          <label>
            A <strong>Cs</strong>ak <strong>A</strong>zért-is <strong>T</strong>
            ekézõk <strong>T</strong>ársasága 1897-es csapatképe
          </label>
          <p>
            A XX. század elejére az országban szinte mindenhol ismerték a
            játékot. Több változata alakult ki, melybõl kettõ a legnépszerûbb.
            Az egyik az un. “akasztófás”, vagy lengõ teke. Ennek a lényege, hogy
            a felfüggesztett golyót meglökve a bábukat hátulról kellett
            eltaláni. Bár a helyi szabályok a társaságok összetételétõl függõen
            változtak. Kis helyigénye miatt volt népszerû. A másik nagyon
            elterjedt játékforma a kugli volt. Ez a kocsma udvarán épített pálya
            volt. Talaja általában agyaggal borított, de nem síkban, hanem
            kicsit domborúan, hogy nehezebb legyen a játék. Ráadásul a golyó
            gurításának vonalában - ahol kitöredezett a pálya - kis gödrök
            voltak, ami speciálissá tette a játékot. Az állítófiúk dolgának
            könnyítése érdekében csak az elsõ három fára játszottak három
            gurítással.
          </p>
          <p>
            A nyereményt itt is a helyi “szokások” alakították: egy fröccs, egy
            korsó sör, vagy pénz volt. Esetleg dupla vagy semmi alapon
            emelkedtek a díjak. 1926. június 3.-án Stokholban nemzetközi
            tekemérkõzés volt, s ekkor alakult meg az<strong> IBA</strong>, azaz
            az
            <strong> Internationale Bowling Assotiation </strong>.
          </p>
          <p>
            Ekkor már Pesterzsébeten, Nagytétényben, Kõbányán, a belvárosban is
            voltak aszfalt pályák. A baráti társaságok idõnként - egyre
            gyakrabban - meghívták ismerõseiket egy játékra, hogy ne csak egymás
            között játszanak, hanem lemérjék tudásukat, ügyességüket másokkal
            szemben is: “ki a legény (leány) a gáton”? Így alakultak ki a
            barátságos mérkõzések.
          </p>
          <h2>BTSZ megalapítása</h2>
          <p>
            1934. június 17.-én a tekézés képviselõi Budapesten (a mai Park
            szállodában) megalakítják a Magyar Tekézõk Szövetségét, egyben
            magalakul a Budapesti Tekézõk Alszövetsége is. A sportág elsõ
            országos elnöke Somogyi Béla volt. A szabályokat az osztrákoktól
            vettük át.
          </p>
          <p>
            Ekkor még Budapesten csak egyetlen szabványos kétsávos pálya volt a
            Westend kávéház pincéjében. A hírre nemcsak sportolók jelentkeztek,
            hanem Budapest legnagyobb építész cége is, amelynek tagjai még
            Németországban és Csehországban tanulták meg, ismerték meg a
            tekepálya építés és felszerelés technikáját. Ezzel megoldották a
            sokszempontból a legnehezebb akadály leküzdését, a versenypálya
            kérdését.
          </p>
          <p>
            <em>“A tekében egy állandó van: a változás” </em>mondta valamikor a
            ‘90-es években Szabó Béla bácsi.
          </p>
          <h2>Hagyományőrző a teke?</h2>
          <p>
            Erre határozottan állíthatjuk, hogy<strong> IGEN!</strong>
          </p>
          <p>
            A játék korai időszakában (amikor még a játéktér sem volt egységes)
            a golyót<strong> dobták</strong>. Innen maradt meg máig is gurítás
            helyett a dobás szó. A középkori vásárokon a játék “természetesen” a
            menyecskék kegyeiért is folyt. A játékosok minden társadalmi
            rétegbõl tevődtek össze, így igen vegyes volt. Innen származik a
            4-es és 6-os bábuk elnevezésére ma is használatos
            <strong> paraszt </strong>elnevezés, valamint az 1-es bábura a{" "}
            <strong> vezér</strong>. Késõbb, amikor már a lovagi tornákon is
            játszották, az előkelő nézők között az udvari
            <strong> dámák </strong>( 2-es, 3-as, 7-es, 8-as bábuk neve) is
            végignézték a mérkőzéseket. Az 5-ös bábu neve némely vidéki pályákon
            a<strong> király</strong>. A korabeli vadászatokat idézi a 2, 4, 7
            valamint a 3, 6, 8-as bábuk neve a<strong> bokor</strong>. Amikor
            ezek a bábuk maradnak állva, a szurkolóktól jön a bíztatás: jön a
            bokor nyulastól. A döngölt földön, ahol a golyókat eldobták, lyukak
            keletkeztek. Ennek kiküszöbölésére letettek a földre egy
            <strong> deszkát </strong>és ezen kellett elgurítani a golyót. Ma is
            ezt a kifejezést használjuk. A 4 - 5 - 7 bábu és az 5 - 6 - 8 bábu
            megmaradásakor tarolásnál hallani a szakmára utaló megjegyzést: -
            Na.<strong> Suszterszék </strong>maradt. A hajdani “fonóra” utal az
            a kifejezés, hogy “megtaláltad a játék fonalát”. Amikor a
            települések népessége annyira gyarapodott, hogy már nem csak egy
            utcából állt egy falu, a kilenc bábura bontásnál kialakult a
            <strong> bal utcára, jobb utcára </strong>bontás kifejezés. Miután
            még az 1960-as években is gyertyán fából készültek a bábuk, így az
            eredményt<strong> fára </strong>számolják ma is. Holott már
            mindenhol mûanyag bábut használnak. A 4 - 5 - 6-os bábu megmaradása
            esetén (az úgynevezett anyós fogsor - nál) hallani lehet a
            nézõtérrõl a megjegyzést: megjött a mama. Németországban még ma is a
            verseny kezdetekor kezet fogó játékosok nem azt mondják, hogy “jó
            eredményt ”, vagy “jó versenyzést kívánok”, hanem:
            <strong>
              <em> “Gut holz”</em>
            </strong>
            , azaz
            <strong>
              <em> “jó fát” </em>
            </strong>
            kívánnak egymásnak - akár baráti találkozóról, akár világversenyrõl
            legyen is szó. Mi magyarok a “sógorokkal” - Ausztriával -
            alakítottunk ki hagyományos kapcsolatot.
          </p>
          <div className={styles.imgContainer}>
            <img src={babuallas} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
