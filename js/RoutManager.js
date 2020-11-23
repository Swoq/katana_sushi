export default class RoutManager {
    constructor(statement_list) {
        window.addEventListener('hashchange', () => this.onRouteChange());
        this.statement_list = statement_list;

        if (window.location.hash)
            if (!this.loadContent(window.location.hash.substring(1)))
                history.pushState(null, null, '/');
    }

    onRouteChange() {
        const hashLocation = window.location.hash.substring(1);

        if (!this.loadContent(hashLocation))
            history.pushState(null, null, '/');
    }

    loadContent(hash) {
        fetch("http://localhost:63342/katana_sushi/layouts/catalog.html")
            .then((response) => response.text())
            .then((html) => {
                console.log(html);
                // let html_body = html
                // document.getElementById("content").innerHTML = ;
            })
            .catch((error) => {
                console.warn(error);
            });
    }
}