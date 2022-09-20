import { useState } from "react"
import palavras from "./palavras"

export default function App() {
    const alfabeto = ["a", "b", "c", "d", "e", "f",
        "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
        "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

    const [palavraSorteada, setPalavraSorteada] = useState("")

    function escolherPalavra() {
        const palavraIndex = Math.floor(Math.random() * palavras.length);
        const palavraSorteada = palavras[palavraIndex];
        esconderPalavra(palavraSorteada);
    }

    function esconderPalavra(palavraSorteada) {
        let palavraEscondida = ""
        for (let i = 0; i < palavraSorteada.length; i++) {
            palavraEscondida += "_";
            setPalavraSorteada(palavraEscondida);
        }
    };

    function Tecla(props) {
        return (
            <div className="tecla tecla-desabilitada"><p>{props.letra}</p></div>
        )
    }

    return (
        <main>
            <header>Jogo da forca 😵</header>
            <section className="topo">
                <div className="forca-imagem">
                    <img src="../assets/forca0.png" alt="forca zerada" />
                </div>
                <div className="forca-direita">
                    <button onClick={escolherPalavra} className="escolher-palavra">Escolher palavra</button>
                    <div className="palavra-sorteada">{palavraSorteada}</div>
                </div>
            </section>
            <section className="fundo">
                <div className="teclado">
                    {alfabeto.map((a, i) => <Tecla letra={a} key={i} data-identifier="letter" />)}
                </div>
                <div className="resposta">
                    <div className="texto">Já sei a palavra!</div>
                    <input className="input-desabilitado" placeholder="Dê seu palpite aqui!" />
                    <button className="chutar">Chutar</button>
                </div>
            </section>
        </main>
    )
}