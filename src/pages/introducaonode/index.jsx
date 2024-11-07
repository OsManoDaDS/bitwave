import React, { useState, useRef, useEffect } from 'react';
import './styles.css';

function introducaoNode() {
    const [progress, setProgress] = useState(0);
    const videoRef = useRef(null);
    const playerRef = useRef(null); // Guarda a referência do player

    useEffect(() => {
        const loadYouTubeAPI = () => {
            if (!window.YT) {
                const script = document.createElement('script');
                script.src = 'https://www.youtube.com/iframe_api';
                document.body.appendChild(script);
            } else {
                initPlayer(); // Inicializa o player se a API já estiver carregada
            }
        };

        const onYouTubeIframeAPIReady = () => {
            initPlayer();
        };

        window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
        loadYouTubeAPI();
    }, []);

    const initPlayer = () => {
        if (playerRef.current) {
            playerRef.current.destroy(); // Destroi o player anterior, se houver
        }

        playerRef.current = new window.YT.Player(videoRef.current, {
            videoId: 'PyrMT0GA3sE', // ID do novo vídeo
            events: {
                onStateChange: onPlayerStateChange,
            },
        });
    };

    const onPlayerStateChange = (event) => {
        if (event.data === window.YT.PlayerState.PLAYING) {
            const interval = setInterval(() => {
                const currentTime = event.target.getCurrentTime();
                const duration = event.target.getDuration();
                const newProgress = (currentTime / duration) * 100;
                setProgress(newProgress);
            }, 100);

            event.target.addEventListener('onStateChange', (event) => {
                if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
                    clearInterval(interval);
                }
            });
        }
    };

    return (
        <>
            <nav className="git-navbar">
                <h1>BitWave</h1>
            </nav>
            
            <main className="git-content">
                <section className="git-video-description">
                    <h2>Aprenda Git e GitHub de forma simples e prática!</h2>
                    <p>
                        Git e GitHub são ferramentas essenciais para qualquer desenvolvedor moderno. Neste vídeo, você aprenderá a usar o <strong>Git</strong> para versionar seu código e o <strong>GitHub</strong> para colaborar e armazenar seus projetos.
                    </p>
                </section>

                <section className="git-video-player">
                    <div id="player" ref={videoRef}></div>
                </section>

                <section className="git-progress-bar-container">
                    <div className="git-progress-bar" style={{ width: `${progress}%` }}></div>
                </section>

                <div className="git-next-step-container">
                    <button className="git-next-step-btn">Próxima etapa</button>
                </div>
            </main>
        </>
    );
}

export default introducaoNode;
