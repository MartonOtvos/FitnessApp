export {};

declare global {
    interface Window {
        playAudio: (path: string) => void;
    }
}