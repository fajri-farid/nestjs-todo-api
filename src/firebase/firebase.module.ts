import { Module } from '@nestjs/common';
import { FirebaseProvider } from './firebase.config';

@Module({
  providers: [FirebaseProvider],
  exports: [FirebaseProvider],
})
export class FirebaseModule {}
