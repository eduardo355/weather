import FogIcon from '@/components/icons/FogIcon.vue'
import RainIcon from '@/components/icons/RainIcon.vue'
import CloudyIcon from '@/components/icons/CloudyIcon.vue'
import PartlyCloudyNight from '@/components/icons/PartlyCloudyNight.vue'
import PartlyCloudyDayIcon from '@/components/icons/PartlyCloudyDayIcon.vue'

export const generateTemperatureIcon = (temperature: string) => {
  if (temperature === 'partly-cloudy-night') return PartlyCloudyNight
  if (temperature === 'partly-cloudy-day') return PartlyCloudyDayIcon
  if (temperature === 'cloudy') return CloudyIcon
  if (temperature === 'rain') return RainIcon
  if (temperature === 'fog') return FogIcon
}
