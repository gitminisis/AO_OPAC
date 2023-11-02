"use strict";
const SESSION_ID = getCookie("HOME_SESSID");
const MAX_CHARS = 10000;
const PAGE_LINK_STYLE = { style: "color : #337ab7", class: "record" };
const CURRENT_RECORD_STYLE = {
    style: "background-color : #047BC1;  color: white !important;",
    class: "tree-highlight record",
};
const RECORD_STYLE = { class: "record" };
const NEXT_TITLE = "Click To View Next Page ...";
const PREV_TITLE = "Click To View Previous Page ...";
let REFD = '';
if (document.getElementById('hiddenREFD') != null) {
    REFD = document.getElementById('hiddenREFD').innerText;
}
let isLoaded = false;
let showTree = false;

// let REFD = getCookie("$REFD");
/**
 *
 * The Node Object
 *
 * @param {*} refd: Record Refd and also be used as node id in jstree
 * @param {*} tree: The current Tree object
 * @param {*} title: Record title
 * @param {*} hasChild: A boolean indicates if this node has children
 * @param {*} loadedChildren: A boolean inidicates if this node has been loaded with AJAX call
 * @param {*} open: A boolean inidcates if this node needs to be open
 * @param {*} parent: Refd of the parent, if this node is the root, parent will be # by default
 * @param {*} link: A search to the record
 * @param {*} childrenArray: stores array of children, false for no children
 * @param {*} isRecord: A boolean inidcates if this node is a record or a page link
 */
function Node(refd, tree) {
    this.refd = refd;
    this.tree = tree;
    this.title;
    this.hasChild;
    this.loadedChildren;
    this.open;
    this.parent;
    this.link;
    this.childrenArray;
    this.isRecord = true;
    this.style = RECORD_STYLE;

    /**
     * Render a node object from AJAX response
     */
    this.render = function(link, tree) {
        this.refd = link.refd;
        this.link = link["search-link"];
        this.title = '<span class="title-text">' + link.title + "</span>";
        this.hasChild = link["has-children"] === "true";
        this.tree = tree;

        if (this.hasChild) {
            let exist = this.tree.getNode(this.refd);
            if (!exist) {
                this.initChildren();
            }
        } else {
            this.setLowestLevel();
        }
    };

    this.setRoot = function(links) {
        this.title =
            '<span class="title-text">' +
            this.refd +
            " - " +
            links.record_title +
            "</span>";

        this.link =
            SESSION_ID +
            "/DESCRIPTION_WEB/REFD/" +
            this.tree.encodeRefd(this.refd) +
            "/$/WEB_DESC_DET?JUMP";

        $("#modifed-parent").text(links.record_title);
    };
    /**
     * This function sets the current node to parent
     *
     * - Sets the children array as an empty array
     * - Sets the loadedChildren to true
     */
    this.setParent = function() {
        this.childrenArray = [];
        this.hasChild = true;
        this.loadedChildren = true;
    };

    /**
     * This function sets the current node to the lowest level
     *
     * - Sets the children array as false
     * - Sets the loadedChildren to true
     */
    this.setLowestLevel = function() {
        this.hasChild = false;
        this.loadedChildren = true;
        this.childrenArray = false;
    };

    /**
     * This function sets the current node to the next page link node
     *
     * - Sets the isRecord to false
     * - Hard code the title
     *
     */
    this.setNextPageLink = function(link, refd, tree) {
        this.isRecord = false;
        this.title = NEXT_TITLE;
        this.link = link["next-page-link"].replace(/LMA_DESCRIPTION/g, 'DESCRIPTION');
        this.renderLink(link, refd, tree);
    };

    /**
     * This function sets the current node to the previous page link node
     *
     * - Sets the isRecord to false
     * - Hard code the title
     *
     */
    this.setPrevPageLink = function(link, refd, tree) {
        this.isRecord = false;
        this.title = PREV_TITLE;
        this.link = link["previous-page-link"].replace(/LMA_DESCRIPTION/g, 'DESCRIPTION');
        this.renderLink(link, refd, tree);
    };

    this.renderLink = function(link, refd, tree) {
        this.link = this.link.replace("START_ENTRY", "STARTENTRY");
        this.hasChild = false;
        this.childrenArray = false;
        this.loadedChildren = true;
        this.parent = refd;
        this.tree = tree;
        this.refd = refd + this.link;
    };

    this.exportNode = function() {
        if (this.hasChild && this.loadedChildren) {
            this.childrenArray = [];
        }
        if (this.hasChild && !this.loadedChildren) {
            this.childrenArray = [];
        }
        if (!this.hasChild) {
            this.childrenArray = false;
        }

        let title = this.title;
        if (this.title && this.title.length > MAX_CHARS) {
            title = title.substring(0, MAX_CHARS) + " ...";
        }
        this.title = title;

        if (this.refd === REFD) {
            this.style = CURRENT_RECORD_STYLE;
        } else if (!this.isRecord) {
            this.style = PAGE_LINK_STYLE;
        }

        return {
            id: this.refd,
            text: this.title ? this.title : this.refd,
            state: {
                opened: this.open ? this.open : false,
            },
            parent: this.parent ? this.parent : "#",
            children: this.childrenArray,
            a_attr: this.style,
        };
    };

    this.loadChildren = function() {
        this.loadedChildren = true;
        this.hasChild = true;
        this.childrenArray = [];
    };

    this.initChildren = function() {
        this.loadedChildren = false;
        this.hasChild = true;
        let node = this;
        this.childrenArray = new Array(1).fill(null).map(function(el, index) {
            let newNode = new Node(index + node.refd, node.tree);
            newNode.parent = node.refd;
            newNode.hasChild = false;
            newNode.loadedChildren = true;
            newNode.childrenArray = false;
            newNode.title = "Loading Record ...";
            node.tree.addNode(newNode);
            return newNode.exportNode();
        });
    };
}

function Tree() {
    this.array = [];
    this.currentNode;
    this.currentRefd;

    this.copyNode = function(oldNode, newNode) {
        newNode.hasChild = oldNode.hasChild;
        newNode.loadedChildren = oldNode.loadedChildren;
        newNode.childrenArray = oldNode.childrenArray;
    };

    this.getNode = function(refd) {
        return this.array.find(function(el) {
            return el.refd === refd;
        });
    };

    this.deleteChildrenOfParent = function(refd) {
        this.array = this.array.filter(function(el) {
            return el.parent !== refd;
        });
    };
    this.addNode = function(node) {
        let exist = this.getNode(node.refd);
        if (!exist) {
            this.array = this.array.concat(node);
        } else {
            this.updateNode(node.refd, node);
        }
    };

    this.updateNode = function(refd, newNode) {
        let node = this.array.find(function(el) {
            return el.refd === refd;
        });
        this.copyNode(node, newNode);
        this.removeNode(refd);
        this.array = this.array.concat(newNode);
    };

    this.removeNode = function(refd) {
        this.array = this.array.filter(function(el) {
            return el.refd !== refd;
        });
    };

    this.getTree = function(refd, tree, url) {
        // console.log(url)
        if (!url) {
            url = tree.getURL(refd);
        } else {
            // url = url.substring(0, url.length - 1);
        }

        return $.ajax(url).then(function(response) {
            let json = xmlToJson(response);

            tree.deleteChildrenOfParent(refd);
            if (hasChildren(json)) {
                tree.renderChildrenNodes(json, refd, tree);
            }

            tree.refreshTree(tree.getNodeArray());
        });
    };

    this.renderChildrenNodes = function(json, refd, tree) {
        json.links.link.map(function(link) {
            let node = new Node();

            if (link.refd) {
                node.render(link, tree);
                node.parent = refd;
            } else {
                if (link["previous-page-link"]) {
                    node.setPrevPageLink(link, refd, tree);
                } else if (link["next-page-link"]) {
                    node.setNextPageLink(link, refd, tree);
                }
            }

            tree.addNode(node);
        });
    };

    this.initTree = function(refd, tree) {
        let url = tree.getURL(refd);

        return $.ajax(url).then(function(response) {
            let json = xmlToJson(response);

            if (hasChildren(json)) {
                tree.renderChildrenNodes(json, refd, tree);
            }

            if (hasParent(json)) {
                let parent = json.links.refd_higher;

                tree.getNode(refd).parent = parent;

                let newNode = new Node(parent, tree);
                newNode.setParent();
                tree.addNode(newNode);

                return tree.initTree(parent, tree);
            }

            let root = tree.getNode(refd);
            root.setRoot(json.links);
        });
    };
    this.refreshTree = function(data) {
        $("#treeTest").jstree(true).settings.core.data = data;
        let tree = $("#treeTest").jstree(true);

        tree.refresh(true);
    };

    this.renderTree = function(treeArray, curRefd) {
        let tree = this;
        $("#treeTest")
            .on("refresh.jstree", function() {
                formatLineIndentation();
                $("#treeTest").prepend('<h3 id="description-tree" tabindex="-1">Hiérarchie des descriptions</h3>')
            })
            .on("ready.jstree", function(e, data) {
                let curNode = $("#treeTest").jstree(true).get_node(tree.currentRefd);

                let jsTree = $(this);
                curNode.parents.map(function(parent) {
                    jsTree.jstree("open_node", parent);
                });
                jsTree.jstree("open_node", tree.currentRefd);

                tree.refreshTree(tree.getNodeArray());
                $("#treeTest").prepend('<h3 id="description-tree" tabindex="-1">Hiérarchie des descriptions</h3>')
            })
            .on("select_node.jstree", function(e, data) {
                let node = tree.getNode(data.node.id);
                if (node.isRecord) {
                    window.location = node.link;
                } else {
                    let url = node.link;

                    tree.getTree(node.parent, tree, url).then(function(res) {});
                }
            })
            .on("open_node.jstree", function(e, data) {
                data.instance.set_type(data.node, "f-open");

                let node = tree.getNode(data.node.id);
                if (!node.loadedChildren) {
                    tree.deleteChildrenOfParent(node.refd);
                    tree.getTree(node.refd, tree).then(function(res) {
                        node.loadedChildren = true;
                    });
                }
                // formatLineIndentation();
            })
            .on("close_node.jstree", function(event, data) {
                data.instance.set_type(data.node, "f-closed");
            })

        .jstree({
            types: {
                default: {
                    icon: "fa fa-folder col-xs-1 icon",
                },
                "f-open": {
                    icon: "fa fa-folder-open col-xs-1 icon",
                },
                "f-closed": {
                    icon: "fa fa-folder col-xs-1 icon",
                },
            },
            plugins: ["types"],
            core: {
                data: treeArray,
                themes: {
                    theme: "default",

                    dots: false,
                },
            },
        });
    };

    this.getNodeArray = function() {
        let tree = this;

        let array = tree.array.reduce(function(cur, val) {
            if (val.title && val.title !== "") {
                cur.push(val.exportNode());
            } else {
                tree.currentRefd = val.parent;
            }
            return cur;
        }, []);

        return array;
    };

    this.getCurrentRecord = function(refd) {
        this.currentNode = new Node(refd, this);
        this.currentNode.setParent();
        this.currentRefd = refd;
        this.addNode(this.currentNode);
    };

    this.encodeRefd = function(refd) {
        return refd.replace(/\//g, "~2F").replace(/&/g, "~26");
    };

    this.getURL = function(refd) {
        return (
            SESSION_ID +
            "/DESCRIPTION_WEB/REFD/" +
            this.encodeRefd(refd) +
            "/EXTRACT_TREE_PAGE?JUMP&DATABASE=DESCRIPTION_WEB&SHARE_SESSID=AO_SHARE_SESSID&SHOWSINGLE=Y&M_GVAR1=START_ENTRY:0&M_GVAR2=TREE_FORMAT:XML"
        );
    };
}

function xmlToJson(response) {
    let xmlText = new XMLSerializer().serializeToString(response);
    let x2js = new X2JS({
        arrayAccessFormPaths: ["links.link"],
    });
    var json = x2js.xml_str2json(xmlText);

    return json;
}

function hasParent(json) {
    return json.links.refd_higher;
}

function hasChildren(json) {
    return json.links.link;
}

function formatLineIndentation() {
    let records = document.querySelectorAll(".record");

    for (let i = 0; i < records.length; i++) {
        let el = records[i];

        let h = el.clientHeight;

        let icon = el.childNodes[0];

        icon.style.height = h + "px";
    }
}

function main() {
    let tree = new Tree();
    REFD = REFD.replace(/&amp;/g, "&");
    tree.getCurrentRecord(REFD);
    tree.initTree(REFD, tree).then(function(res) {
        let data = tree.getNodeArray();
        tree.renderTree(data, REFD);
        enableTreeDisplay();
        // let records = document.querySelectorAll(".record");
    });

}

$(document).ready(function() {
    if (document.getElementById("treeTest")) {
        // console.log(REFD);
        // console.log("test");
        disableTreeDisplay();
        main();
    }
});


const enableTreeDisplay = () => {
    let treeBtn = document.getElementsByClassName('tree-btn')[0];
    treeBtn.disabled = false;
    treeBtn.style.background = '#047BC1'
    treeBtn.style.borderColor = '#047BC1'
}

const disableTreeDisplay = () => {
    let treeBtn;
    try {
        treeBtn = document.getElementsByClassName('tree-btn')[0];
        treeBtn.style.background = 'grey';
        treeBtn.style.borderColor = 'grey';
    } catch (e) { console.log(enableTreeDisplay) }
}

const focusTree = () => {
    let tree = document.getElementsByClassName('jstree-1')[0];

    if (!showTree) {
        tree.scrollIntoView({ behavior: 'smooth' });
        showTree = true;
    } else showTree = false;


}