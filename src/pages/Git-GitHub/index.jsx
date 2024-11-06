import React, { useState, useRef, useEffect } from 'react';
import './styles.css';

function GitGitHub() {
    const [progress, setProgress] = useState(0);
    const videoRef = useRef(null);

    // Carregar o script da YouTube Iframe API
    useEffect(() => {
        // Verifica se a API já foi carregada
        if (!window.YT) {
            const script = document.createElement('script');
            script.src = 'https://www.youtube.com/iframe_api';
            document.body.appendChild(script);
        }
    }, []);

    // Função chamada quando a API do YouTube está pronta
    useEffect(() => {
        // Cria um novo player assim que a API do YouTube estiver carregada
        window.onYouTubeIframeAPIReady = () => {
            const player = new window.YT.Player(videoRef.current, {
                videoId: 'DlHJjTNNTzc', // ID do vídeo
                events: {
                    onStateChange: onPlayerStateChange,
                },
            });
        };
    }, []);

    // Função chamada quando o estado do player muda (quando o vídeo está tocando)
    const onPlayerStateChange = (event) => {
        if (event.data === window.YT.PlayerState.PLAYING) {
            // Atualiza o progresso enquanto o vídeo está sendo reproduzido
            const interval = setInterval(() => {
                if (event.target && event.target.getCurrentTime) {
                    const currentTime = event.target.getCurrentTime();
                    const duration = event.target.getDuration();
                    const newProgress = (currentTime / duration) * 100;
                    setProgress(newProgress);
                }
            }, 100); // Atualiza a cada 100ms

            // Limpeza do intervalo quando o vídeo é pausado ou termina
            event.target.addEventListener('onStateChange', function onStateChange(event) {
                if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
                    clearInterval(interval);
                }
            });
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className='row mt-3'>
                    <h1>BitWave</h1>
                </div>
            </nav>
            <div>

                <br />
                <br />
                <br />
                <br />
                <center>
                    {/* Descrição do vídeo */}
                    <div className="video-description">
                        <h1>Aprenda Git e GitHub de forma simples e prática!</h1>
                        <p>
                            Git e GitHub são ferramentas essenciais para qualquer desenvolvedor moderno.
                            Neste vídeo, você aprenderá como utilizar o <strong>Git</strong> para versionar seu código e como usar o <strong>GitHub</strong> para colaborar com outros desenvolvedores e armazenar seus projetos de forma segura na nuvem.
                        </p>
                        <p>
                            Se você ainda não domina essas ferramentas, não se preocupe! Este vídeo é o ponto de partida ideal para quem quer melhorar suas habilidades em controle de versão e colaboração em projetos de software.
                            Não perca a chance de aprender com um dos melhores conteúdos sobre Git e GitHub!
                        </p>
                    </div>

                    {/* Player de vídeo do YouTube */}
                    <div id="player" ref={videoRef}></div>
                </center>
            </div>

            {/* Barra de Progresso */}
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
            <div className='row mt-3'>
                <center>
                <div className='col-1'>
                    <button><span>Próxima etapa</span></button>
                </div>
                </center>
            </div>
        </>
    );
}

export default GitGitHub;
