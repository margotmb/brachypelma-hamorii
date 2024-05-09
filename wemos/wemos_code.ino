/* Nome: Margot Machado Baisch (19203810) */

#include <ESP8266WiFi.h>
#include <DHT.h>
#include <DHT_U.h>

#define DHT_PIN 16 // D2
#define DHTTYPE DHT11

#define redLED 13 // D5
#define yellowLED 12 //D6
#define greenLED 14// D7

DHT_Unified dht(DHTPIN, DHTTYPE);

char ssid[] = ""; //SSID - Nome da Wifi
char pass[] = ""; //Senha da Wifi

void setup() {

  // D5 = 13 - RED LED
  pinMode(redLED, OUTPUT);
  // D6 = 12 - YELLOW LED
  pinMode(yellowLED, OUTPUT);
  // D7 = 14 - GREEN LED
  pinMode(greenLED, OUTPUT);

  Serial.begin(115200);
  delay(10);

  // Conecta na Wifi
  Serial.println();
  Serial.println();
  Serial.print("Connecting to...");
  Serial.println(ssid);
  /*
  
  WiFi.begin(ssid, pass);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  */
  Serial.println("");
  Serial.println("Wi-Fi connected successfully");
  
}

void loop() {
  int valor_lido = analogRead(A0);
  Serial.print("AnalogRead: ");
  Serial.println(valor_lido);

  // Mapeia de 0 a 100
  //valor_lido = map(valor_lido, 1024, 400, 0, 100);
  delay(1000);

}

