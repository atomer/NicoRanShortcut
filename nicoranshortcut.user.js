// ==UserScript==
// @name        NicoRanShortcut
// @namespace   http://www.atomer.sakura.ne.jp
// @description ニコニコランキングのカテゴリショートカット的なやつ
// @include     http://www.nicovideo.jp/ranking/*
// @version     1.0.0
// ==/UserScript==

const CATEGORY_LIST = {
    all: {},
    g_ent2: {
        ent: "エンターテイメント",
        music: "音楽",
        sing: "歌ってみた",
        play: "演奏してみた",
        dance: "踊ってみた",
        vocaloid: "VOCALOID",
        nicoindies: "ニコニコインディーズ"
    },
    g_life2: {
        animal: "動物",
        cooking: "料理",
        nature: "自然",
        travel: "旅行",
        sport: "スポーツ",
        lecture: "ニコニコ動画講座",
        drive: "車載動画",
        history: "歴史"
    },
    g_politics: {},
    g_tech: {
        science: "科学",
        tech: "ニコニコ技術部",
        handcraft: "ニコニコ手芸部",
        make: "作ってみた"
    },
    g_culture2: {
        anime: "アニメ",
        game: "ゲーム",
        jikkyo: "実況プレイ動画",
        toho: "東方",
        imas: "アイドルマスター",
        radio: "ラジオ",
        draw: "描いてみた"
    },
    g_other: {
        are: "例のアレ",
        diary: "日記",
        other: "その他"
    }
};

function parseURL(url) {
    let m = url.match(/\/ranking\/(.+)$/);
    let a = m[1].split("/");
    return {
        target: a[0],
        period: a[1],
        category: a[2]
    };
}

const navigations = document.querySelectorAll(".mainMenu > .inner .navigation li");
let childNav = document.querySelector(".mainMenu > .category .navigation");

if (!childNav) {
    let cat = document.querySelector(".mainMenu > .category .inner");
    childNav = document.createElement("ul");
    childNav.className = "navigation";
    cat.insertBefore(childNav, cat.firstChild);
}

[].forEach.apply(navigations, [el => {
    let html;
    if (/current/.test(el.className)) {
        html = childNav.innerHTML;
    } else {
        let list = [];
        let a = el.querySelector("a");
        let group = parseURL(a.href);
        let category = CATEGORY_LIST[group.category] || {};
        for (let c in category) {
            let url = ["ranking", group.target, group.period, c].join("/");
            list.push(`<li><a href="${url}">${category[c]}</a></li>`);
        }
        html = list.join("");
    }
    el.addEventListener("mouseover",  () => {
        childNav.innerHTML = html;
    }, false);
}]);