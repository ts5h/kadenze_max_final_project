/*
 * Arduino to Max - June 2021, Atsushi Yamazaki
 * 
 * Send serial data from connected sensors on Arduino to my Max patch
 * Reference:
 * https://zenn.dev/ie4/articles/d8846be2ba8c12
 * https://deviceplus.jp/hobby/entry016/
 * http://www.musashinodenpa.com/arduino/ref/index.php?f=2&pos=270
*/


#define echoPin 2
#define trigPin 3

#define piezzoPin A0
#define potentioPin A1


void setup() {
  Serial.begin(115200);
  pinMode(echoPin, INPUT);
  pinMode(trigPin, OUTPUT);
}

void loop() {
  // For gain
  Serial.print(getPiezzoValue());
  Serial.print(" ");

  // For MIDI
  Serial.print(getMIDINum());
  Serial.print(" ");

  // For harmonicity
  Serial.print(getPotentioValue());
  Serial.println("");

  // piezzo delay + delay = 50ms
  delay(30);
}


// Get the distance for MIDI
int getMIDINum() {
  float duration = 0;
  float distance = 0;

  // Get the ultrasonice sensor value
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = (duration / 2) * 0.0344; // Simple measurement

  // Convert the sensor value to a MIDI number arbitrary 
  float dist = distance;
  int midi = 0;
  float min = 3.0;
  float max = 40.0;

  if (dist <= min) {
    dist = min;
  } else if (dist >= max) {
    dist = max;
  }

  midi = map(dist, min, max, 32, 120);
  return midi;
}

// Get the piezzo value for gain
int getPiezzoValue() {
  int i = 0;
  int tmpGain = 0;
  int gain = 0;

  // Get max of 10 times
  for (i = 0; i < 20; i++) {
    tmpGain = analogRead(piezzoPin);
    if (tmpGain >= gain) {
      gain = tmpGain;
    }
    
    delay(1);
  }

  return map(gain, 0, 1023, 64, 127);
}

// Get the potentio metor value for harmonicity
int getPotentioValue() {
  return analogRead(potentioPin);
}
