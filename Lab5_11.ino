#include <Firebase_ESP_Client.h>
#include <ESP8266WiFi.h>
#include <addons/RTDBHelper.h>

// Thông tin mạng WiFi
#define WIFI_SSID "NhatHaoNguyen"
#define WIFI_PASSWORD "toikhonggay"

// Thông tin Firebase
#define FIREBASE_HOST "https://esp8266-firebase-voltage-default-rtdb.firebaseio.com/"  // URL Firebase
#define FIREBASE_AUTH "AIzaSyAEkwzFIEr6NSwBVRdeWtOBWG47rW9zkOM"                  // Secret Key Firebase

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

void setup() {
  Serial.begin(9600);
  pinMode(A0, INPUT);

  // Kết nối WiFi
  Serial.print("Connecting to WiFi");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected!");

  // Cấu hình Firebase
  config.host = FIREBASE_HOST;
  config.signer.tokens.legacy_token = FIREBASE_AUTH;
  Firebase.begin(&config, &auth);

  // Thông báo khi setup hoàn tất
  Serial.println("Setup complete, starting loop...");
}

void loop() {
  int analogValue = analogRead(A0);  // Đọc giá trị từ biến trở
  float voltage = (analogValue / 1024.0) * 3.3;  // Tính điện áp (giả lập 3.3V)

  // Gửi dữ liệu lên Firebase với push() để không ghi đè dữ liệu cũ và mỗi bản ghi có một ID duy nhất
  String path = "/Voltage"; // Đường dẫn Firebase

  // Sử dụng push() để tạo ID tự động cho mỗi bản ghi
  if (Firebase.RTDB.pushFloat(&fbdo, path, voltage)) {
    Serial.print("Data sent to Firebase successfully. Voltage: ");
    Serial.println(voltage, 2);  // In ra điện áp với 2 chữ số thập phân
  } else {
    Serial.println("Failed to send data to Firebase.");
    Serial.println(fbdo.errorReason());
  }

  delay(5000);  // Gửi dữ liệu sau mỗi 5 giây
}
