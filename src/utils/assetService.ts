import { ImageSourcePropType } from 'react-native';

// Fallback high-resolution portraits & content for demo mode
const IMAGE_LIBRARY: Record<string, string> = {
  // Profiles
  'gaurav.jpg': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  'john.jpg': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
  'sarah.jpg': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  'alex.jpg': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
  'david.jpg': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
  'kritika.jpg': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80',
  'akshat.jpg': 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80',
  'simmy.jpg': 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80',
  'bharti.jpg': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
  'ronak.jpg': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',

  // Post & Story Content
  'post_dev01.jpg': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1080&q=85',
  'post_dev02.jpg': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1080&q=85',
  'post_portrait01.jpg': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1080&q=85',
  'post_travel01.jpg': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1080&q=85',
  'post_travel02.jpg': 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1080&q=85',
  'post_travel03.jpg': 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1080&q=85',
  'post_gym01.jpg': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1080&q=85',
  'post_gym02.jpg': 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1080&q=85',
  'post_coffee.jpg': 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1080&q=85',
  'post_city01.jpg': 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=1080&q=85',
  'post_city02.jpg': 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1080&q=85',
  'post_nature01.jpg': 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1080&q=85',
  'post_nature02.jpg': 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1080&q=85',
  'post_art01.jpg': 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1080&q=85',
  'post_art02.jpg': 'https://images.unsplash.com/photo-1563089145-599997674d42?w=1080&q=85',
  'post_music01.jpg': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1080&q=85',
  'post_fashion01.jpg': 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1080&q=85',
  'post_fashion02.jpg': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1080&q=85',
  'post_fashion03.jpg': 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1080&q=85',
  'post_car01.jpg': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1080&q=85',
  'post_food01.jpg': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1080&q=85',
  'post_food02.jpg': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1080&q=85',

  // Highlight Covers
  'highlight_travel.jpg': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80',
  'highlight_work.jpg': 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&q=80',
  'highlight_gym.jpg': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
  'highlight_life.jpg': 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400&q=80',
  'highlight_code.jpg': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80',
};

/**
 * Resolves an image path, key, or URL to a valid React Native ImageSource.
 */
export function resolveImage(source: string | null | undefined): ImageSourcePropType {
  if (!source) {
    return { uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80' };
  }
  if (source.startsWith('http://') || source.startsWith('https://') || source.startsWith('data:')) {
    return { uri: source };
  }
  if (IMAGE_LIBRARY[source]) {
    return { uri: IMAGE_LIBRARY[source] };
  }
  return { uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80' };
}

