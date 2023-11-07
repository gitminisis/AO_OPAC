const MARC_TITLE = {
    020: "ISBN",
    022: "ISSN",
    100: "Auteur",
    110: "Auteur",
    130: "Auteur",
    245: "Titre",
    246: "Autre(s) titre(s)",
    250: "Mention d'édition",
    260: "Éditeur",
    264: "Date de publication",
    300: "Description physique",
    490: "Série",
    500: "Notes générales",
    504: "Références bibliographiques",
    505: "Contenu",
    506: "Restrictions",
    520: "Portée et contenu",
    524: "Référence privilégiée",
    533: "Description",
    "535_IND1": "Détenteur des originaux",
    "535_IND2": "Détenteur de copies",
    541: "Source d'acquisition",
    544: "Emplacement d'autres documents d'archives",
    "544_IND0": "Documents associés",
    "544_IND1": "Documents connexes",
    545: "Notice biographique",
    "545_IND0": "Notice biographique",
    "545_IND1": "Antécédents administratifs",
    546: "Note concernant la langue",
    600: "Vedettes-matière",
    610: "Vedettes-matière",
    650: "Vedettes-matière",
    651: "Vedettes-matière",
    690: "Vedettes-matière locales",
    700: "Personne supplémentaire",
    710: "Organisations connexes",
    780: "Titres précédents",
    785: "Titres suivants",
    800: "Série de documents",
    810: "Série de documents",
  };
  
  /**
   * This function takes a XML Element and converts it to
   * JSON object, specifically for Item Info Object from
   * BIBLIO
   *
   * The XML is created in WEB_BIBLIO_ITEM_INFO
   *
   *
   * @param {XML Node Element} xml
   */
  function toMarcJson(xml) {
    /**
     * Specify which one is an array of objects
     */
    var x2js = new X2JS({
      arrayAccessFormPaths: [
        "marc.m_852_b",
        "marc.m_852_c",
        "marc.m_852_z",
        "marc.m_866_a",
        "marc.m_866_z",
      ],
    });
    var jsonObj = x2js.xml_str2json(xml);
  
    return jsonObj;
  }
  
  $(document).ready(function () {
    
    
    let countMarc = 1;
    
    $(".marc-btn").each(function() {

        let marc_xml = document.querySelector("#marc" + countMarc);
        let table =
        '<div class="modal fade" id="marcModal' + countMarc + '" tabindex="-1" role="dialog" aria-labelledby="marcModal" style="display: none;" aria-hidden="true"><div class="modal-dialog modal-dialog-centered modal-lg" role="document"> <div class="modal-content"> <div class="modal-header" style=" background-color: #414042 !important; "> <h5 class="modal-title" id="exampleModalLongTitle" style="color:white !important">Valeurs MARC</h5> <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"> <span aria-hidden="true" hidden="">×</span> </button> </div> <div class="modal-body"><table id="marc-table">';

        table += "<tr><th>MARC Field</th><th>MARC Title</th><th>MARC Value</th></tr>";
        
        if (marc_xml) {
            let xmlText = new XMLSerializer().serializeToString(marc_xml);
            //console.log(xmlText);
            let json = toMarcJson(xmlText).marc;
        
        for (let marc in json) {
            let id = marc;
            let value = json[marc];
            if (
            id[0] !== "_" &&
            value !== "" &&
            id !== "m_852_c" &&
            id !== "m_852_z" &&
            id !== "m_866_a" &&    id !== "m_866_z"
            ) {
            let tag = new MarcTag(id, value);
            let html = tag.render();
            table += html;
            }
        }
        table +=
            '</table> </div> <div class="modal-footer"> <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> </div> </div> </div> </div>';
        //console.log(table);
        }
        $('body').append(table)
       countMarc++;
    });
    
    // console.log($("#marcModal").length)
    
  });
  

  function htmlSpecialChars(unsafe) {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }


  function MarcTag(id, value) {
    let count = 1;
    let marc_xml = document.querySelector("#marc" + count++);
    let xmlText = new XMLSerializer().serializeToString(marc_xml);
  
    let json = toMarcJson(xmlText).marc;
    //console.log(json);
    this.marc = json;
    this.id = id.split("m_")[1].toUpperCase();
    this.value = value;
    this.title = MARC_TITLE[this.id] ? MARC_TITLE[this.id] : this.id;
    this.render = function () {
      return (
        "<tr>" +
        "<td>" +
        this.renderTag() +
        "</td>" +
        "<td>" +
        this.renderTitle() +
        "</td>" +
        "<td>" +
        this.renderValue() +
        "</td>" +
        "</tr>"
      );
    };
    this.renderTag = function () {
      return "<p>" + this.id + "</p>";
    };
    this.renderTitle = function () {
      return "<p>" + this.title + "</p>";
    };
    this.renderValue = function () {
      if (this.id === "852_B") {
        let returnStr = this.value
          .filter((e, i) => i % 2 === 1)
          .map((val, index) => {
            let m866a = "";
  
            let m852z = "";
            if (
              this.marc["m_866_a"] !== undefined &&
              this.marc["m_866_a"][index] !== undefined
            ) {
              m866a = this.marc["m_866_a"][index];
            }
  
            if (
              this.marc["m_852_z"] !== undefined &&
              this.marc["m_852_z"][index] !== undefined
            ) {
              m852z = this.marc["m_852_z"][index];
            }
            let returnStr =
              "<p>" +
              val +
              " " +
              this.marc["m_852_c"].filter((e, i) => i % 2 === 1)[index] +
              " " +
              m852z +
              " " +
              m866a +
              "</p>";
  
            return returnStr;
          })
          .join("");
  
        let detailField = this.value
          .filter((e, i) => i % 2 === 1)
          .map((val, index) => {
            let m866a = "";
  
            let m852z = "";
            if (
              this.marc["m_866_a"] !== undefined &&
              this.marc["m_866_a"][index] !== undefined
            ) {
              m866a = this.marc["m_866_a"][index];
            }
  
            if (
              this.marc["m_852_z"] !== undefined &&
              this.marc["m_852_z"][index] !== undefined
            ) {
              m852z = this.marc["m_852_z"][index];
            }
  
            let returnStr =
              val +
              " " +
              this.marc["m_852_c"].filter((e, i) => i % 2 === 1)[index] +
              " " +
              m852z +
              " " +
              m866a;
  
            return returnStr;
          })
          .join("<br/> <br />");
        $("#biblio-link").before(
          `<tr><td class="record-detail-title">[[-Holdings:--]</td><td> <ul><li class="detail-content" id="detailField">${detailField}</li></ul></td></tr>`
        );
  
        return `<p>${returnStr}</p>`;
      }
  
      if (!Array.isArray(this.value)) {
        //console.log(this.value);
        return "<p>" + this.value + "<p>";
      }
      return this.value
        .map(function (val) {
          return "<p>" + val + "</p>";
        })
        .join("");
    };
  }
  