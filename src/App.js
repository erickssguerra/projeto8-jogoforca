import { useState } from "react"
import palavras from "./palavras"
import forca00 from "./assets/forca0.png"
import forca01 from "./assets/forca1.png"
import forca02 from "./assets/forca2.png"
import forca03 from "./assets/forca3.png"
import forca04 from "./assets/forca4.png"
import forca05 from "./assets/forca5.png"
import forca06 from "./assets/forca6.png"

export default function App() {
    const alfabeto = ["a", "b", "c", "d", "e", "f",
        "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
        "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

    const [palavraSorteada, setPalavraSorteada] = useState("");
    const [palavraEscondida, setPalavraEscondida] = useState("");
    const [habilitaTeclas, setHabilitaTeclas] = useState("tecla-desabilitada");
    const [habilitaInput, setHabilitaInput] = useState("input-desabilitado");
    const [guardaLetra, setGuardaLetra] = useState([]);
    const [statusTeclado, setStatusTeclado] = useState(true);
    let [erros, setErros] = useState(0);
    const [forca, setForca] = useState(forca00);
    const [resultadoFinal, setResultadoFinal] = useState("");
    const [statusInput, setStatusInput] = useState("");
    const [statusBotao, setStatusBotao] = useState("Escolher palavra")
    const [disabledInput, setDisabledInput] = useState(true)

    function sortearPalavra() {
        let palavraIndex = Math.floor(Math.random() * palavras.length);
        const palavraSorteada = palavras[palavraIndex];
        setPalavraSorteada(palavraSorteada);
        esconderPalavra(palavraSorteada);
        habilitarJogo();
        setErros(0);
        setForca(forca00);
        setResultadoFinal("");
        console.log("Palavra sorteada: ", palavraSorteada);
        setStatusInput("");
        setStatusBotao("Trocar palavra")
        setDisabledInput(false);
    }

    function esconderPalavra(palavraSorteada) {
        let palavraEscondida = ""
        for (let i = 0; i < palavraSorteada.length; i++) {
            palavraEscondida += "_";
        }
        setPalavraEscondida(palavraEscondida);
    };

    function habilitarJogo() {
        setHabilitaTeclas("tecla-habilitada");
        setStatusTeclado(false);
        const input = document.querySelector("input");
        input.disabled = false;
        setHabilitaInput("input-habilitado");
        setGuardaLetra([]);
    }

    function clicaTecla(letra) {
        let novoArray = [...guardaLetra] //como usar um const aqui?
        if (!novoArray.includes(letra)) {
            novoArray = [...guardaLetra, letra]
            setGuardaLetra(novoArray);
            comparaLetra(letra);
        }
    }

    function comparaLetra(letra) {
        const palavraCrua = palavraSorteada.normalize("NFD").replace(/[^a-zA-Z\s]/g, "");
        if (palavraCrua.includes(letra)) {
            revelaLetra(letra);
        } else {
            erros++
            setErros(erros)
            switch (erros) {
                case 1: return setForca(forca01);
                case 2: return setForca(forca02);
                case 3: return setForca(forca03);
                case 4: return setForca(forca04);
                case 5: return setForca(forca05);
                case 6: setForca(forca06);
                    perdeuJogo();
                    break;
                default: break;
            }
        }
    }

    function perdeuJogo() {
        setPalavraEscondida(palavraSorteada);
        setStatusTeclado([]);
        setResultadoFinal("vermelho");
        setHabilitaInput("input-desabilitado");
        const input = document.querySelector("input");
        input.disabled = true;
        setStatusInput("");
        setStatusBotao("Tentar de novo")
        setDisabledInput(true);
    }

    function revelaLetra(letra) {
        const arrayPalavraEscondida = palavraEscondida.split("");
        const arrayPalavraSorteada = palavraSorteada.split("");
        for (let i = 0; i < arrayPalavraSorteada.length; i++) {
            if (letra === arrayPalavraSorteada[i].normalize("NFD").replace(/[^a-zA-Z\s]/g, "")) {
                arrayPalavraEscondida[i] = arrayPalavraSorteada[i];
            }
        }
        const palavraFinal = arrayPalavraEscondida.join("")
        setPalavraEscondida(palavraFinal)
        if (palavraFinal === palavraSorteada) {
            ganhouJogo();
        }
    }

    function ganhouJogo() {
        setResultadoFinal("verde");
        setStatusTeclado([])
        setHabilitaInput("input-desabilitado")
        const input = document.querySelector("input");
        input.disabled = true;
        setStatusInput("");
        setStatusBotao("Nova palavra")
        setDisabledInput(true)
    }
    function respostaInput() {
        if (statusInput.toLowerCase().normalize("NFD").replace(/[^a-zA-Z\s]/g, "") === palavraSorteada.normalize("NFD").replace(/[^a-zA-Z\s]/g, "")) {
            setPalavraEscondida(palavraSorteada);
            ganhouJogo();
        } else {
            perdeuJogo();
            setForca(forca06);
        }
    }

    function Tecla(props) {
        return (
            <button onClick={() => clicaTecla(props.letra)}
                disabled={guardaLetra.includes(props.letra) || statusTeclado ? true : false}
                id={props.id}
                className={`tecla ${guardaLetra.includes(props.letra) || statusTeclado ? "tecla-desabilitada" : "tecla-habilitada"}`}>
                <p>{props.letra}</p></button>
        )
    }


    return (
        <main>
            <header>Jogo da forca 😵</header>
            <section className="topo">
                <div className="forca-imagem">
                    <img src={forca} data-identifier="game-image" alt="forca" />
                </div>
                <div className="forca-direita">
                    <button onClick={sortearPalavra} data-identifier="choose-word" className="escolher-palavra">{statusBotao}</button>
                    <div data-identifier="word" className={`palavra-sorteada ${resultadoFinal}`}>{palavraEscondida}</div>
                </div>
            </section>
            <section className="fundo">
                <div className="teclado">
                    {alfabeto.map((a, i) => <Tecla
                        teclaStatus={habilitaTeclas}
                        id={a}
                        letra={a}
                        key={i}
                        data-identifier="letter" />)}
                </div>
                <div className="resposta">
                    <div className="texto">Já sei a palavra!</div>
                    <input
                        className={habilitaInput}
                        data-identifier="type-guess"
                        disabled={disabledInput}
                        value={statusInput}
                        placeholder="Dê seu palpite aqui!"
                        onChange={(event) => setStatusInput(event.target.value)} />
                    <button
                        disabled={disabledInput}
                        data-identifier="guess-button"
                        onClick={respostaInput}
                        className="chutar">Chutar</button>
                </div>
            </section>
        </main>
    )
}