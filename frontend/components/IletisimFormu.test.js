import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import IletisimFormu from './IletisimFormu';

// eğer sürekli "render(<IletisimFormu/>);" yapısını kullanmak istemiyorsak; beforeAll yapısını kullanabiliriz.

// beforeAll(() => {
//     render(<IletisimFormu/>)
// })

beforeEach(() => {
    render(<IletisimFormu/>)
});

test('hata olmadan render ediliyor', () => {
//  beforeEach render ı burası içinde geçerli
});
// getBy - burada eğer tek bir şey arratıracak isek o zaman By kullanıyoruz, eğer birden fazla ise getAll kullanıyoruz.
test('iletişim formu headerı render ediliyor', () => {
    // render(<IletisimFormu/>); onun yerine beforeEah yapısı kullanılıyor. Normalde bu yorum satırındaki yapıyı beforeEach olmaz ise tüm testlerin başında yazmamız lazım.
    screen.getByText("İletişim Formu");
});

test('kullanıcı adını 5 karakterden az girdiğinde BİR hata mesajı render ediyor.', async () => {
    const adInput = screen.getByTestId("ad-input");
    userEvent.type(adInput,"1234");
    
    screen.getByTestId("ad-error"); // eğer bunu queryBy ile yapmak isteseydik o zaman queryBy dan sonra expect(adInputError).toBeInTheDocument(); yazarız

});

test('kullanıcı inputları doldurmadığında ÜÇ hata mesajı render ediliyor.', async () => {
    const submit = screen.getByTestId("submit-btn");
    fireEvent.click(submit);

    screen.getByTestId("ad-error");
    screen.getByTestId("soyad-error");
    screen.getByTestId("email-error");
    

    
});

test('kullanıcı doğru ad ve soyad girdiğinde ama email girmediğinde BİR hata mesajı render ediliyor.', async () => {
    
    const adInput = screen.getByTestId("ad-input");
    userEvent.type(adInput, "okyanus"); 

    const soyadInput = screen.getByTestId("soyad-input");
    userEvent.type(soyadInput, "aydogan"); 


    const submit = screen.getByTestId("submit-btn");
    fireEvent.click(submit);

    screen.getByTestId("email-error");


});

test('geçersiz bir mail girildiğinde "email geçerli bir email adresi olmalıdır." hata mesajı render ediliyor', async () => {
     
    const emailInput = screen.getByTestId("email-input");
    userEvent.type(emailInput,"okyanusaydgnom");

    screen.getByText("Hata: email geçerli bir email adresi olmalıdır.")

});

test('soyad girilmeden gönderilirse "soyad gereklidir." mesajı render ediliyor', async () => {
    
    const adInput = screen.getByTestId("ad-input");
    userEvent.type(adInput,"okyanus");

    const emailInput = screen.getByTestId("email-input");
    userEvent.type(emailInput,"okyanusaydgn@gmail.com");
    
    
    const submit = screen.getByTestId("submit-btn");
    fireEvent.click(submit);

    screen.getByText("Hata: soyad gereklidir.");
});

test('ad,soyad, email render ediliyor. mesaj bölümü doldurulmadığında hata mesajı render edilmiyor.', async () => {
    const adInput = screen.getByTestId("ad-input");
    userEvent.type(adInput,"okyanus");


    const soyadInput = screen.getByTestId("soyad-input");
    userEvent.type(soyadInput,"aydogan");

    const emailInput = screen.getByTestId("email-input");
    userEvent.type(emailInput,"okyanusaydgn@gmail.com");
    
    
    const submit = screen.getByTestId("submit-btn");
    fireEvent.click(submit);

    const adError = screen.queryByTestId("ad-error");
    const soyadError = screen.queryByTestId("soyad-error");
    const emailError = screen.queryByTestId("email-error");

    expect(adError).toBeNull();
    expect(soyadError).toBeNull();
    expect(emailError).toBeNull();

});

test('form gönderildiğinde girilen tüm değerler render ediliyor.', async () => {

    const adInput = screen.getByTestId("ad-input");
    userEvent.type(adInput,"okyanus");


    const soyadInput = screen.getByTestId("soyad-input");
    userEvent.type(soyadInput,"aydogan");

    const emailInput = screen.getByTestId("email-input");
    userEvent.type(emailInput,"okyanusaydgn@gmail.com");
    
    const mesajInput = screen.getByTestId("mesaj-input");
    userEvent.type(mesajInput,"test başarıyla tamamlandı");
    
    const submit = screen.getByTestId("submit-btn");
    fireEvent.click(submit);

    const gDiv = screen.getByTestId("goruntule-div");
    expect(gDiv).toBeInTheDocument();

});


// queryByText yapısı hata olsa bile hata fırlatmıyor o yüzden biz expect yapısını da ekliyoruz

// const h1Dom = screen.queryByText("İletisim Formu 123");
// expect(h1Dom).toBeInTheDocument();