

marked.setOptions({
    highlight: function(code, lang) {
        return hljs.highlight(lang, code).value;
    }
});    

async function load(route) {
    var link = "md/" + route.link + ".md";
    let content = await fetch(link);
    if (content.status != 200)
        return "Not found " + content.url;
    var md = marked(await content.text());
    return md;
}