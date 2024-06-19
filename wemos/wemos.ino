

/*
Nome: Margot Machado Baisch
Matrícula: 19203810

PINS                Wemos | Arduino

static const uint8_t D0   = 3;
static const uint8_t D1   = 1;
static const uint8_t D2   = 16;
static const uint8_t D3   = 5;
static const uint8_t D4   = 4;
static const uint8_t D5   = 14;
static const uint8_t D6   = 12;
static const uint8_t D7   = 13;
static const uint8_t D8   = 0;
static const uint8_t D9   = 2;
static const uint8_t D10  = 15;
static const uint8_t D11  = 13;
static const uint8_t D12  = 12;
static const uint8_t D13  = 14;
static const uint8_t D14  = 4;
static const uint8_t D15  = 5;

D4 -> Sensor Luz
D5 -> Sensor Temp
D6 -> Red Led
D7 -> Green Led

*/
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecureBearSSL.h>
#include <ESP8266WiFi.h>
#include <dht11.h>

/* 4 - D4*/
#define pinoLDR 4

/* 12 - D6 */
#define redLED 12
/* 13 - D7*/
#define greenLED 13

/* 14 - D5 */
#define DHT11PIN 14
dht11 DHT11;
char ssid[] = "motog30_123"; //SSID - Nome da Wifi
char pass[] = "12345678"; //Senha da Wifi


void setup() {
  pinMode(redLED, OUTPUT);
  pinMode(greenLED, OUTPUT);
  pinMode(pinoLDR,INPUT);
  Serial.begin(57600);
  delay(10);

  digitalWrite(greenLED, LOW);
  digitalWrite(redLED, HIGH);
  // Conecta na Wifi
  Serial.println();
  Serial.println();
  Serial.print("Connecting to...");
  Serial.println(ssid);
  
  WiFi.begin(ssid, pass);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("Wi-Fi connected successfully");
  
  digitalWrite(greenLED, HIGH);
  digitalWrite(redLED, LOW);
}

void loop() {
    if (WiFi.status() == WL_CONNECTED){
      digitalWrite(greenLED, HIGH);
      digitalWrite(redLED, LOW);
      std::unique_ptr<BearSSL::WiFiClientSecure>client(new BearSSL::WiFiClientSecure);
  
      // Ignore SSL certificate validation
      client->setInsecure();
      
      //create an HTTPClient instance
      HTTPClient https;

      int luz = digitalRead(pinoLDR);
      Serial.println("----------");
      Serial.print("Luz:");
      if (luz == 1){
        Serial.println(" Desligada");
      }
      else{
        Serial.println(" Ligada");
      }
    
      int chk = DHT11.read(DHT11PIN);
      
      Serial.print("Umidade (%): ");
      float umidade_f = (float)DHT11.humidity;
      Serial.println(umidade_f, 2);

   
      Serial.print("Temperatura (C): ");
      float temp_f = (float)DHT11.temperature;
      Serial.println(temp_f, 2);

      String umidade = String(umidade_f,2);
      String temperatura = String(temp_f,2);
      delay(2000);
      
      //Initializing an HTTPS communication using the secure client
      Serial.print("[HTTPS] begin...\n");
      if (https.begin(*client, "https://stunning-spark-xax8.onrender.com/sensorevents")) {  // HTTPS
        Serial.print("[HTTPS] POST...\n");
        // start connection and send HTTP header
        https.addHeader("Content-Type", "application/x-www-form-urlencoded");
        String httpRequestData = "sensorMoisture=" ;
        httpRequestData.concat(umidade);
        httpRequestData.concat("&sensorTemp=");
        httpRequestData.concat(temperatura);
        httpRequestData.concat("&sensorLight=");
        httpRequestData.concat(luz);
        Serial.println(httpRequestData);
        int httpCode = https.POST(httpRequestData);
        // httpCode will be negative on error
        if (httpCode > 0) {
          // HTTP header has been send and Server response header has been handled
          Serial.printf("[HTTPS] GET... code: %d\n", httpCode);
          // file found at server
          if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
            String payload = https.getString();
            Serial.println(payload);
          }
        } else {
          Serial.printf("[HTTPS] GET... failed, error: %s\n", https.errorToString(httpCode).c_str());
        }
  
        https.end();
      } else {
        Serial.printf("[HTTPS] Unable to connect\n");
      }
      Serial.println("Standby for next cycle...");
      delay(3000);
    }
    else{
      digitalWrite(greenLED, LOW);
      digitalWrite(redLED, HIGH);
      Serial.println("Lost Connection - Retrying...");
      delay(2500);
    }
}
