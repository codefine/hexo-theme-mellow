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
    const autoShow = /(#gitment-display-button)|(#gitment)$/.test(window.location.href);
    if (autoShow) {
        ShowGitment();
    }
    function ShowGitment() {
        const moreBtn = document.getElementById("gitment-display-button");
        if (moreBtn) {
            moreBtn.style.display = "none";
        }
        main.classList.remove('hide');
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