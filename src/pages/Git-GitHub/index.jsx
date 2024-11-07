import React, { useState, useRef, useEffect } from 'react';
import './styles.css';

function GitGitHub() {
    const [progress, setProgress] = useState(0);
    const videoRef = useRef(null);

    useEffect(() => {
        if (!window.YT) {
            const script = document.createElement('script');
            script.src = 'https://www.youtube.com/iframe_api';
            document.body.appendChild(script);
        }
        console.log(typeof(progress))
    }, []);

    useEffect(() => {
        window.onYouTubeIframeAPIReady = () => {
            new window.YT.Player(videoRef.current, {
                videoId: 'DlHJjTNNTzc',
                events: {
                    onStateChange: onPlayerStateChange,
                },
            });
        };
    }, []);

    const onPlayerStateChange = (event) => {
        if (event.data === window.YT.PlayerState.PLAYING) {
            const interval = setInterval(() => {
                const currentTime = event.target.getCurrentTime();
                const duration = event.target.getDuration();
                const newProgress = (currentTime / duration) * 100;
                setProgress(newProgress);
            }, 100);

            event.target.addEventListener('onStateChange', function onStateChange(event) {
                if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
                    clearInterval(interval);
                }
            });
        }
    };

    const goToNextPage = () => {
        // Defina a URL da próxima página após a conclusão do curso
        window.location.href = '/dashboard'; // Substitua pela URL desejada
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
                    <button className="git-next-step-btn" onClick={goToNextPage}>Finalizar</button>
                </div>
            </main>
        </>
    );
}

export default GitGitHub;