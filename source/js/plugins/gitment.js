let id = window.location.pathname;

if (id === "/") { //home
    const idGroup = [...document.querySelectorAll(".post-comments-counter")].map(link => {
        return link.id;
    });
    idGroup.forEach(id => {
        pageGitment(id);
    });
} else {
    pageGitment(id);
}

if (DC.g.lazy) {
    const main = document.getElementById("gitment");
    if (main) {
        main.style.display = "none";
    }
    function ShowGitment() {
        const moreBtn = document.getElementById("gitment-display-button");
        moreBtn.style.display = "none";
        main.style.display = "block";
        const toggleRoot = document.querySelector(".post-comments-count.gitment-comments-count");
        if (toggleRoot) {
            toggleRoot.parentNode.href = toggleRoot.parentNode.href.replace(/#gitment-display-button/, "#gitment");
        }
    }
}

function pageGitment(id, onlyCounter) {
    const gitment = new Gitmint({
        lang: 'en',
        id: id,
        owner: DC.g.owner,
        repo: DC.g.repo,
        oauth: {
            client_id: DC.g.oauth.client_id,
            client_secret: DC.g.oauth.client_secret
        },
        perPage: DC.g.perPage
    });
    gitment.render(document.getElementById("gitment"));
}