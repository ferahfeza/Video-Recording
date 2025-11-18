# Video Kayıt Uygulaması

React ve Vite ile geliştirilmiş modern bir video kayıt uygulaması.

## Özellikler

- 🎥 **Gerçek Zamanlı Video Kayıt**: Kamera ve mikrofon kullanarak video kaydedin
- 🎤 **Ses Kayıt Desteği**: Video ile birlikte ses kaydetme
- ⏸️ **Duraklat/Devam Et**: Kayıt sırasında duraklatma ve devam ettirme
- 💾 **Video İndirme**: Kaydedilen videoyu bilgisayarınıza indirin
- ⏱️ **Kayıt Süresi Göstergesi**: Kayıt süresini gerçek zamanlı takip edin
- 📱 **Responsive Tasarım**: Mobil ve masaüstü cihazlarda çalışır

## Kurulum

### Gereksinimler

- Node.js (v18 veya üzeri)
- npm veya yarn

### Adımlar

1. Depoyu klonlayın:
```bash
git clone https://github.com/ferahfeza/Video-Recording.git
cd Video-Recording
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Tarayıcınızda `http://localhost:5173` adresini açın

## Kullanım

1. **Kamerayı Başlat** butonuna tıklayarak kamera ve mikrofon izinlerini verin
2. **Kaydı Başlat** butonuna tıklayarak video kaydını başlatın
3. İsterseniz **Duraklat** butonuyla kaydı duraklatabilirsiniz
4. **Kaydı Durdur** butonuyla kaydı tamamlayın
5. Kaydedilen videoyu önizleyin ve **Videoyu İndir** butonuyla indirin
6. **Yeni Kayıt** butonuyla yeni bir kayıt başlatın

## Üretim Derlemesi

Üretim için optimize edilmiş bir derleme oluşturmak için:

```bash
npm run build
```

Derlenen dosyalar `dist/` klasöründe oluşturulur.

Derlenmiş uygulamayı önizlemek için:

```bash
npm run preview
```

## Teknolojiler

- **React 19**: Kullanıcı arayüzü için
- **Vite**: Hızlı geliştirme ve derleme için
- **MediaRecorder API**: Video ve ses kayıt için
- **getUserMedia API**: Kamera ve mikrofon erişimi için

## Tarayıcı Desteği

Bu uygulama modern tarayıcılarda çalışır:
- Chrome/Edge (önerilen)
- Firefox
- Safari (iOS 14.3+)
- Opera

**Not**: Kamera ve mikrofon erişimi için HTTPS gereklidir (localhost hariç).

## Lisans

MIT

## Katkıda Bulunma

Katkılarınızı bekliyoruz! Pull request göndermekten çekinmeyin.
