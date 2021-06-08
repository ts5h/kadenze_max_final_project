/*
 * Arduino to Max - June 2021, Atsushi Yamazaki
 * 
 * Send serial data from connected sensors on Arduino to my Max patch
 * Reference:
 * https://deviceplus.jp/hobby/entry016/
 * http://www.musashinodenpa.com/arduino/ref/index.php?f=2&pos=270
*/

#define echoPin 2 // Echo
#define trigPin 3 // Trigger

float duration = 0;
float distance = 0;


void setup() {
  Serial.begin(115200);
  pinMode(echoPin, INPUT);
  pinMode(trigPin, OUTPUT);
}

void loop() {
  // Gain
  Serial.print(127);
  Serial.print(" ");

  // MIDI
  int midiNum = ultrasonicToMIDI();
  Serial.print(midiNum);
  Serial.print(" ");

  // Harmonicity
  Serial.print(0.00);
  Serial.println("");
  
  delay(100);
}


// MIDI: Convert the ultrasonic value to the MIDI
int ultrasonicToMIDI() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = (duration / 2) * 0.0344; // Simple measurement

  long dist = round(distance * 100);
  if (dist <= 200) {
    dist = 200;
  } else if (dist >= 4000) {
    dist = 4000;
  }

  return map(dist, 200, 4000, 23, 112);
}


// Gain: Convert the piezzo value to the gain
// Harmonicity: Convert the potentio meter to the harmonicity values 
