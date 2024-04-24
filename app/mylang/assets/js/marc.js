const MARC_TITLE = {
    020: "[--ISBN--]",
    022: "[--ISSN--]",
    100: "[--Author--]",
    110: "[--Author--]",
    130: "[--Author--]",
    245: "[--Title--]",
    246: "[--Alternate Title(s)--]",
    250: "[--Edition Statement--]",
    260: "[--Publisher--]",
    264: "[--Publication Date--]",
    300: "[--Physical Description--]",
    490: "[--Series--]",
    500: "[--General Notes--]",
    504: "[--Bibliographical References--]",
    505: "[--Contents--]",
    506: "[--Restrictions--]",
    520: "[--Scope and Content--]",
    524: "[--Preferred Citation--]",
    533: "[--Description--]",
    "535_IND1": "[--Holder of Originals--]",
    "535_IND2": "[--Holder of Duplicates--]",
    541: "[--Source of Acquisition--]",
    544: "[--Location of Other Archival Materials--]",
    "544_IND0": "[--Associated Materials--]",
    "544_IND1": "[--Related Materials--]",
    545: "[--Biographical Note--]",
    "545_IND0": "[--Biographical Sketch--]",
    "545_IND1": "[--Administrative History--]",
    546: "[--Language Note--]",
    600: "[--Subject Headings--]",
    610: "[--Subject Headings--]",
    650: "[--Subject Headings--]",
    651: "[--Subject Headings--]",
    690: "[--Local Subject Headings--]",
    700: "[--Additional Individual--]",
    710: "[--Related Organizations--]",
    780: "[--Preceeding Titles--]",
    785: "[--Succeeding Titles--]",
    800: "[--Series Records--]",
    810: "[--Series Records--]",
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
        '<div class="modal fade" id="marcModal' + countMarc + '" tabindex="-1" role="dialog" aria-labelledby="marcModal" style="display: none;" aria-hidden="true"><div class="modal-dialog modal-dialog-centered modal-lg" role="document"> <div class="modal-content"> <div class="modal-header" style=" background-color: #414042 !important; "> <h5 class="modal-title" id="exampleModalLongTitle" style="color:white !important">[--MARC Values--]</h5> <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close"> <span aria-hidden="true" hidden="">×</span> </button> </div> <div class="modal-body"><table id="marc-table">';

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
  