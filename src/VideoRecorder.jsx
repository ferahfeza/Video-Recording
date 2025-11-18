import { useState, useRef, useEffect } from 'react';
import './VideoRecorder.css';

function VideoRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);

  const videoRef = useRef(null);
  const recordedVideoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording, isPaused]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const requestPermission = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: true
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasPermission(true);
    } catch (err) {
      setError('Kamera ve mikrofon erişimi reddedildi. Lütfen izinleri kontrol edin.');
      console.error('Error accessing media devices:', err);
    }
  };

  const startRecording = async () => {
    if (!streamRef.current) {
      await requestPermission();
      if (!streamRef.current) return;
    }

    try {
      const options = { mimeType: 'video/webm;codecs=vp9,opus' };
      
      // Try different codecs if the preferred one is not supported
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options.mimeType = 'video/webm;codecs=vp8,opus';
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          options.mimeType = 'video/webm';
        }
      }

      const mediaRecorder = new MediaRecorder(streamRef.current, options);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedVideoUrl(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      setError(null);
    } catch (err) {
      setError('Kayıt başlatılamadı: ' + err.message);
      console.error('Error starting recording:', err);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording && !isPaused) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isRecording && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  const downloadVideo = () => {
    if (recordedVideoUrl) {
      const a = document.createElement('a');
      a.href = recordedVideoUrl;
      a.download = `recording-${Date.now()}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const resetRecording = () => {
    if (recordedVideoUrl) {
      URL.revokeObjectURL(recordedVideoUrl);
    }
    setRecordedVideoUrl(null);
    setRecordingTime(0);
    setError(null);
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setHasPermission(false);
    }
  };

  return (
    <div className="video-recorder">
      <h1>Video Kayıt Uygulaması</h1>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="video-container">
        {!recordedVideoUrl ? (
          <div className="live-preview">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="video-preview"
            />
            {isRecording && (
              <div className="recording-indicator">
                <span className="rec-dot"></span>
                <span className="rec-text">KAYIT: {formatTime(recordingTime)}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="recorded-preview">
            <video
              ref={recordedVideoRef}
              src={recordedVideoUrl}
              controls
              className="video-preview"
            />
          </div>
        )}
      </div>

      <div className="controls">
        {!hasPermission && !recordedVideoUrl && (
          <button onClick={requestPermission} className="btn btn-primary">
            Kamerayı Başlat
          </button>
        )}

        {hasPermission && !isRecording && !recordedVideoUrl && (
          <>
            <button onClick={startRecording} className="btn btn-success">
              Kaydı Başlat
            </button>
            <button onClick={stopCamera} className="btn btn-secondary">
              Kamerayı Kapat
            </button>
          </>
        )}

        {isRecording && (
          <>
            {!isPaused ? (
              <button onClick={pauseRecording} className="btn btn-warning">
                Duraklat
              </button>
            ) : (
              <button onClick={resumeRecording} className="btn btn-warning">
                Devam Et
              </button>
            )}
            <button onClick={stopRecording} className="btn btn-danger">
              Kaydı Durdur
            </button>
          </>
        )}

        {recordedVideoUrl && (
          <>
            <button onClick={downloadVideo} className="btn btn-success">
              Videoyu İndir
            </button>
            <button onClick={resetRecording} className="btn btn-primary">
              Yeni Kayıt
            </button>
          </>
        )}
      </div>

      <div className="info">
        <h3>Özellikler:</h3>
        <ul>
          <li>🎥 Gerçek zamanlı video kayıt</li>
          <li>🎤 Ses kayıt desteği</li>
          <li>⏸️ Duraklat/Devam et</li>
          <li>💾 Video indirme</li>
          <li>⏱️ Kayıt süresi göstergesi</li>
        </ul>
      </div>
    </div>
  );
}

export default VideoRecorder;
